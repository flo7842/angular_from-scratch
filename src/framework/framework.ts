export class Framework {
    /**
     * Le tableau qui recense l'ensemble des directives déclarées dans le projet
     */
    directives: any[] = [];
    /**
     * Le tableau qui contient les instances de srevices d"j& construites
     * (pour ne pas avoir à les reconstruire indéfiniments)
     */
    services: { name: string, instance: any}[]  = [];
    /**
     * Le tableau qui contient les définitions de mes services (comment
     * construire tel ou tel service)
     */
    providers: { provide: string, construct: Function}[] = []
    /**
     * Le traitement qui va instancier les directives et les greffer
     * aux éléments HTML ciblés par les sélecteurs CSS
     */
    bootstrapApplication(metadata: { providers?: any[]; declarations: any[]}) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations;

        this.directives.forEach(directive => {
    
            const elements = document.querySelectorAll<HTMLElement>(directive.selector);
        
            elements.forEach((element) => {
                const params = this.analyseDirectiveConstructor(directive, element);
                const directiveInstance: any = Reflect.construct(directive, params);
                directiveInstance.init()
            });
        })
    }

    /**
     * Permet d'analyser les besoins d'un constrcuteur et de créer les instances nécessaires (les dépendances)
     * @param directive La classe de la directive à instancier
     * @param element L'élément HTML sur lequel on veut greffer la directive
     * @returns Le tableau de paramètres nécessaire pour instancier ma directive
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString())
        
        if(!hasConstructor){
            return [];
        }
    
        const paramsNames = this.extractParamNamesFromDirective(directive);
    
        const params = paramsNames.map(name => {
            if(name === "element") {
                return element;
            }
    
            const directiveProviders = directive.providers || [];
    
            const directiveProvider = directiveProviders.find(p => p.provide === name);
    
            if(directiveProvider) {
                const instance = directiveProvider.construct();
                return instance;
            }
            
            const service = this.services.find((s) => s.name === name);
    
            if(service) {
                return service.instance;
            }
    
            const provider = this.providers.find(p => p.provide === name)
            
            if(!provider) {
                throw new Error("Aucun fournisseur n'existe pour le service " + name);
            }
    
            const instance = provider.construct();
    
            this.services.push({
                name,
                instance
            })
    
            return instance;
        });
    
        return params;
    }

    /**
     * Extrait les noms des paramètres du constructeur d'une directive
     * @param directive La directive dont je veux connaître les paramètres
     * @returns Un tableau avec le nom des paramètres du constructeur
     */
    private  extractParamNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if(!params){
            return [];
        }
    
        return params[1].split(", ");
        
    }
}

export const Angular = new Framework();