import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlService } from '../core/services';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-date-control',
    template: `
        <mat-form-field appearance="fill">
            <mat-label *ngIf="controlConfig.label">{{ controlConfig.label }}</mat-label>
            <input
                matInput
                [id]="controlConfig.key"
                [matDatepicker]="picker"
                [formControl]="control"
                [placeholder]="controlConfig.placeholder || ''"
                [readonly]="controlConfig.readOnly || false"
                [attr.min]="controlConfig.minDate"
                [attr.max]="controlConfig.maxDate"
                [attr.aria-invalid]="ariaAttributes['aria-invalid']"
                [attr.aria-required]="ariaAttributes['aria-required']"
                [attr.aria-describedby]="getErrorId()"
            />
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="control.invalid && control.touched" [id]="getErrorId()">
                {{ controlService.getErrorMessage(control, controlConfig) }}
            </mat-error>
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    control!: FormControl;
    ariaAttributes!: { [key: string]: string | null };

    constructor(public controlService: ControlService) {}

    ngOnInit(): void {
        // Initialize the FormControl with the validators defined in the service
        this.control = this.controlService.createFormControl(this.controlConfig);

        // Set ARIA attributes for accessibility
        this.ariaAttributes = this.controlService.getAriaAttributes(this.control, this.controlConfig);

        // Add this control to the parent FormGroup
        if (this.formGroup) {
            this.formGroup.addControl(this.controlConfig.key, this.control);
        }
    }

    // Get the ID of the error message element for ARIA compliance
    getErrorId(): string {
        return `${this.controlConfig.key}-error`;
    }
}
