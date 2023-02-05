import { CreditCardDirective } from "./directives/credit-card.directive ";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { Formatter } from "./services/formatter";

// Framework
Angular.bootstrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [
        {
            provide: "formatter",
            construct: () => new Formatter("global")
        },
    ]
});
