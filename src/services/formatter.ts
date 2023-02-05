export class Formatter {
    
    constructor(name: string) {
        console.log("Je suis le formatteur ", name);
    }

    formatNumber(initialValue: string, length: number, groupsLength: number, willHaveSpaces = true){
        const value = initialValue.replace(/[^\d]/g, '').substring(0, length);

        const groups: string[] = [];

        for(let i = 0; i < value.length; i += groupsLength){
            groups.push(value.substring(i, i + groupsLength))
        }

        return groups.join(willHaveSpaces ? ' ' : '')
    }
}