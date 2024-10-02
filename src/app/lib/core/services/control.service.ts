import { Injectable } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorMessage, ControlConfig } from '../models'; // Ensure ErrorMessage and ControlConfig are imported correctly

@Injectable({
    providedIn: 'root',
})
export class ControlService {
    // Method to initialize a FormControl based on the provided configuration
    createFormControl(config: ControlConfig, data: any = ''): FormControl {
        return new FormControl(data || config.defaultValue || '', this.getValidators(config));
    }

    // Method to generate validators based on control configuration
    getValidators(config: ControlConfig): ValidatorFn[] {
        const validators: ValidatorFn[] = [];

        // Basic validators
        if (config.required) validators.push(Validators.required);
        if (config.requiredTrue) validators.push(Validators.requiredTrue);
        if (config.maxLength) validators.push(Validators.maxLength(config.maxLength));
        if (config.minLength) validators.push(Validators.minLength(config.minLength));

        // Numeric validations
        if (config.min !== undefined) validators.push(Validators.min(config.min));
        if (config.max !== undefined) validators.push(Validators.max(config.max));

        // Date validations with custom validators for minDate and maxDate
        if (config.minDate) validators.push(this.minDateValidator(config.minDate));
        if (config.maxDate) validators.push(this.maxDateValidator(config.maxDate));

        // Pattern validation
        if (config.pattern) validators.push(Validators.pattern(config.pattern));

        // Email validation
        if (config.email) validators.push(Validators.email);

        // Custom validator
        if (config.customValidator) validators.push(config.customValidator);

        return validators;
    }

    // Method to get error messages based on the current state of the FormControl
    getErrorMessage(control: FormControl, config: ControlConfig): string {
        const errorMessages: ErrorMessage = {
            required: `${config.label} is required.`,
            requiredTrue: `${config.label} must be checked.`,
            maxlength: `Maximum length is ${config.maxLength}.`,
            minlength: `Minimum length is ${config.minLength}.`,
            min: `Value should not be less than ${config.min}.`,
            max: `Value should not be more than ${config.max}.`,
            minDate: `Date should not be earlier than ${config.minDate}.`,
            maxDate: `Date should not be later than ${config.maxDate}.`,
            pattern: `${config.label} does not match the required pattern.`,
            email: `${config.label} must be a valid email address.`,
        };

        const errorKey = Object.keys(errorMessages).find((error) => control.hasError(error));
        return errorKey ? errorMessages[errorKey] : 'Invalid input.';
    }

    // Custom validator function for minimum date
    private minDateValidator(minDate: string): ValidatorFn {
        return (control: AbstractControl) => {
            const inputDate = new Date(control.value);
            const min = new Date(minDate);
            if (control.value && inputDate < min) {
                return { minDate: true };
            }
            return null;
        };
    }

    // Custom validator function for maximum date
    private maxDateValidator(maxDate: string): ValidatorFn {
        return (control: AbstractControl) => {
            const inputDate = new Date(control.value);
            const max = new Date(maxDate);
            if (control.value && inputDate > max) {
                return { maxDate: true };
            }
            return null;
        };
    }

    // Method to generate ARIA attributes for accessibility
    getAriaAttributes(control: FormControl, config: ControlConfig): { [key: string]: string | null } {
        return {
            'aria-invalid': control.invalid ? 'true' : 'false',
            'aria-required': config.required ? 'true' : 'false',
            'aria-describedby': control.invalid ? `${config.key}-error` : null,
        };
    }
}
