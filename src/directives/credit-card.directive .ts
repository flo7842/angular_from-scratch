import { Formatter } from "../services/formatter";

export class CreditCardDirective{
    static selector = '[credit-card]';
    

    constructor(public element: HTMLElement, private formatter: Formatter) {
    }

    formatCreditCardNumber(element: HTMLInputElement){
        
        element.value = this.formatter.formatNumber(element.value, 16, 4, true);
    }

    init(){
        this.element.style.borderColor = 'green';
        this.element.addEventListener('input', (event) => {
            this.formatCreditCardNumber(event.target as HTMLInputElement);
        })
    }
}