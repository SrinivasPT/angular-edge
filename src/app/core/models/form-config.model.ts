import { ValidatorFn } from '@angular/forms';

export interface PageConfig {
    buttons: string;
    sections: string[];
    additionalSections: string[];
    sectionRepository: SectionConfig[];
}

export interface SectionConfig {
    sectionId: string;
    typeCode: string;
    width: string;
    controls: ControlConfig[];
}

export interface ControlConfig {
    key: string;
    label?: string;
    typeCode?: string; // Control type (e.g., text, number, email)
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
}
