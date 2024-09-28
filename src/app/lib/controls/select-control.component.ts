import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlConfig, DomainData } from '../core/models';
import { ControlService, DomainDataService } from '../core/services';

@Component({
    selector: 'app-select-control',
    template: `
        <mat-form-field appearance="fill" style="width: 100%;">
            <mat-label *ngIf="controlConfig.label">{{ controlConfig.label }}</mat-label>
            <mat-select
                [id]="controlConfig.key"
                [formControl]="control"
                [attr.aria-invalid]="ariaAttributes['aria-invalid']"
                [attr.aria-required]="ariaAttributes['aria-required']"
                [attr.aria-describedby]="getErrorId()"
                [placeholder]="controlConfig.placeholder || 'Select an option'"
            >
                <mat-option value="" disabled>{{ controlConfig.placeholder || 'Select an option' }}</mat-option>
                <mat-option *ngFor="let option of options" [value]="option.code">
                    {{ option.displayText }}
                </mat-option>
            </mat-select>
            <mat-error *ngIf="control.invalid && control.touched" [id]="getErrorId()">
                {{ controlService.getErrorMessage(control, controlConfig) }}
            </mat-error>
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    control!: FormControl;
    ariaAttributes!: { [key: string]: string | null };
    options: DomainData[] = [];

    constructor(
        public controlService: ControlService, // Inject ControlService
        private domainDataService: DomainDataService // Inject DomainDataService
    ) {}

    ngOnInit(): void {
        // this.control = this.controlService.createFormControl(this.controlConfig);
        const isDisabled = this.controlConfig.readOnly || false;

        this.control = this.controlService.createFormControl({
            ...this.controlConfig,
            defaultValue: { value: this.controlConfig.defaultValue || '', disabled: isDisabled }, // Set disabled state here
        });

        this.ariaAttributes = this.controlService.getAriaAttributes(this.control, this.controlConfig);

        // Fetch domain data based on category code
        if (this.controlConfig.categoryCode) {
            this.domainDataService.getDomain(this.controlConfig.categoryCode).subscribe((data) => {
                this.options = data;
            });
        }

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
