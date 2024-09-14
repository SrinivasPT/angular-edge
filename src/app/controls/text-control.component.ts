import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ControlService } from '../core/services';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-text-control',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    template: `
        <mat-form-field appearance="fill">
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    control!: FormControl;
    ariaAttributes!: { [key: string]: string | null };

    constructor(public controlService: ControlService) {}

    ngOnInit(): void {
        this.control = this.controlService.createFormControl(this.controlConfig);
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
