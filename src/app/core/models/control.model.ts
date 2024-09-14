import { ValidatorFn } from '@angular/forms';

export interface ControlConfig {
    key: string;
    label?: string;
    placeholder?: string;
    defaultValue?: any;
    readOnly?: boolean;
    required?: boolean;
    requiredTrue?: boolean; // Checkbox validation to be true
    categoryCode?: string; // For Select Control
    maxLength?: number;
    minLength?: number;
    min?: number; // Minimum value for number inputs
    max?: number; // Maximum value for number inputs
    minDate?: string; // Minimum date value in 'yyyy-mm-dd' format
    maxDate?: string; // Maximum date value in 'yyyy-mm-dd' format
    pattern?: string; // Regex pattern for validation
    email?: boolean; // Specific validation for email format
    customValidator?: ValidatorFn; // Custom validation function
    width?: string;
    type?: string; // Control type (e.g., text, number, email)
}
