import { FormGroup } from '@angular/forms';

// Utility function to navigate to the root formGroup
export const getRootFormGroup = (formGroup: FormGroup): FormGroup => {
    while (formGroup.parent) formGroup = formGroup.parent as FormGroup;
    return formGroup;
};

// Custom expression evaluation utility function
export const evaluateExpression = (expression: string, context: any): boolean => {
    try {
        // Create a new function that evaluates the expression in the given context
        return new Function('context', `with(context) { return ${expression}; }`)(context);
    } catch (e) {
        console.error('Error evaluating expression:', e);
        return false;
    }
};
