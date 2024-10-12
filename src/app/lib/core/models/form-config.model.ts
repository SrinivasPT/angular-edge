import { ValidatorFn } from '@angular/forms';

export interface PageConfig {
    title: string;
    buttons: string;
    sections: string[];
    additionalSections: string[];
    sectionRepository: SectionConfig[];
}

export interface SectionConfig {
    key: string;
    title: string;
    typeCode: string;
    width: string;
    controls: ControlConfig[];
}

export interface ControlConfig {
    key: string;
    label?: string;
    typeCode?: string; // Control type (e.g., text, number, email)
    placeholder?: string;
    sectionKey?: string; // For the section control.
    defaultValue?: any;
    readOnly?: boolean;
    required?: boolean;
    editableExpression: string;
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
    displayOrder?: string;
    // For table
    title?: string; // Table title (optional)
    columns?: ControlConfig[]; // Columns will follow the same configuration as controls
    dataSource?: any[]; // Data to be displayed
    pagination?: boolean; // Enable pagination
    pageSize?: number; // Default page size for pagination
    sortable?: boolean; // Enable sorting
    filterable?: boolean; // Enable filtering
}
