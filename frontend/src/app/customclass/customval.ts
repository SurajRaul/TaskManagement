import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Customval {
    static match(control: AbstractControl<any, any>): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmP = control.get('confirmPassword')?.value
        if (password != confirmP)
            return { match: true }
        else
            return null
    }
    static valueMatch(control1: string, control2: string): ValidatorFn {
        return (control: AbstractControl) => {
            const value1 = control.get(control1)?.value;
            const value2 = control.get(control2)?.value;
            if (value1 != value2) {
                return { valueMatch: true };
            } else {
                return null;
            }

        }
    }
    static mailAccount(account: string): ValidatorFn {
        return (control: AbstractControl) => {
            const value = control.value;
            if (!value.substring(value.indexOf('@').includes(account)))
                return { mailAccount: true }
            else
                return null;
        }
    }
}
