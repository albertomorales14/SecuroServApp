import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[specialCharValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SpecialCharValidatorDirective, multi: true }]
})
export class SpecialCharValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
        return hasSpecialChar ? null : { noSpecialChar: true };
    }
};

export const VALIDATIONS = {
    USER_REQUIRED: '* El usuario es obligatorio',
    USER_MIN_LENGTH: '* El usuario debe tener al menos 5 caracteres',
    USER_EXIST: '* Este usuario ya existe',
    USER_NON_EXIST: '* Este usuario no existe',
    PASSWORD_REQUIRED: '* La contraseña es obligatoria',
    PASSWORD_MIN_LENGTH: '* La contraseña debe tener al menos 5 caracteres',
    PASSWORD_INCORRECT: '* La contraseña es incorrecta',
    SUCCESS_MESSAGE: '¡Usuario creado correctamente!'
};