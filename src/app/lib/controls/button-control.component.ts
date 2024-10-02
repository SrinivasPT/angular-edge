import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlConfig } from '../core/models';
import { ControlService } from '../core/services';

@Component({
    selector: 'app-button-control',
    template: `
        <button mat-raised-button color="primary" (click)="onClick()">
            {{ controlConfig.label }}
        </button>
    `,
})
export class ButtonControlComponent {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;

    constructor(public controlService: ControlService) {}

    onClick(): void {
        const actionKey = this.controlConfig.key;

        // Retrieve the function from the formGroup or its ancestors
        const actionFunction = this.controlService.getAction(this.formGroup, actionKey);

        if (actionFunction) {
            actionFunction(); // Execute the function
        } else {
            console.warn(`No action found for key: ${actionKey}`);
        }
    }
}
