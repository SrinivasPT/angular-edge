import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlService } from '../core/services';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-text-control',
    template: `
        <mat-form-field appearance="fill" style="width: 100%;">
            <mat-label *ngIf="controlConfig.label">{{ controlConfig.label }}</mat-label>
            <input
                matInput
                [id]="controlConfig.key"
                [type]="controlConfig.typeCode || 'text'"
                [formControl]="control"
                [placeholder]="controlConfig.placeholder || ''"
                [readonly]="controlConfig.readOnly || false"
                [attr.aria-invalid]="ariaAttributes['aria-invalid']"
                [attr.aria-required]="ariaAttributes['aria-required']"
                [attr.aria-describedby]="getErrorId()"
            />
            <mat-error *ngIf="control.invalid && control.touched" [id]="getErrorId()">
                {{ controlService.getErrorMessage(control, controlConfig) }}
            </mat-error>
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TextControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    control!: FormControl;
    ariaAttributes!: { [key: string]: string | null };

    constructor(public controlService: ControlService) {}

    // ngOnInit(): void {
    //     this.control = this.controlService.createFormControl(this.controlConfig);
    //     this.ariaAttributes = this.controlService.getAriaAttributes(this.control, this.controlConfig);

    //     // Add this control to the parent FormGroup
    //     if (this.formGroup) {
    //         this.formGroup.addControl(this.controlConfig.key, this.control);
    //     }
    // }

    ngOnInit(): void {
        // Check if the control already exists in the FormGroup
        if (this.formGroup && this.formGroup.get(this.controlConfig.key)) {
            // Use the existing FormControl
            this.control = this.formGroup.get(this.controlConfig.key) as FormControl;
        } else {
            // Create a new FormControl with initial value
            const initialValue = this.controlConfig?.defaultValue || null;
            this.control = this.controlService.createFormControl(this.controlConfig);

            // Add this control to the parent FormGroup
            if (this.formGroup) {
                this.formGroup.addControl(this.controlConfig.key, this.control);
            }
        }

        this.ariaAttributes = this.controlService.getAriaAttributes(this.control, this.controlConfig);
    }

    // Get the ID of the error message element for ARIA compliance
    getErrorId(): string {
        return `${this.controlConfig.key}-error`;
    }
}
