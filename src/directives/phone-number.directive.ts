import { Formatter } from "../services/formatter";

export class PhoneNumberDirective{
    static selector = '[phone-number]';
    willHaveSpaces = true;
    borderColor = "red";
    static providers = [
        {
            provide: "formatter",
            construct: () => new Formatter("Spécifique")
        },
    ]
    
    constructor(public element: HTMLElement, private formatter: Formatter) {
       
    }

    formatPhoneNumber(element: HTMLInputElement){
        element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
    }

    init(){

        if(this.element.hasAttribute('border-color')) {
            this.borderColor = this.element.getAttribute('border-color')!;
        }

        if(this.element.hasAttribute('with-spaces')) {
            this.willHaveSpaces = this.element.getAttribute('with-spaces') === "true";
        }

        this.element.style.borderColor = this.borderColor;

        this.element.addEventListener('input', (event) => {
            this.formatPhoneNumber(event.target as HTMLInputElement);
        })
    }
}