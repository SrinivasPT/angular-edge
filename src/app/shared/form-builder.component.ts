import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlConfig } from '../core/models';
import { ControlService } from '../core/services';
import { ControlBuilderComponent } from './control-builder.component';

interface SectionConfig {
    title?: string;
    controls: ControlConfig[];
}

@Component({
    selector: 'app-form-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ControlBuilderComponent],
    template: `
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="form-renderer">
            <ng-container *ngFor="let section of sectionConfigs">
                <fieldset *ngIf="section.title">
                    <legend>{{ section.title }}</legend>
                    <app-control-builder [controlConfigs]="section.controls" [formGroup]="formGroup"></app-control-builder>
                </fieldset>
            </ng-container>
            <button type="submit" [disabled]="formGroup.invalid" class="submit-button">Submit</button>
        </form>
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
    @Input() sectionConfigs: SectionConfig[] = [];
    formGroup: FormGroup;

    constructor(private fb: FormBuilder, private controlService: ControlService) {
        this.formGroup = this.fb.group({});
    }

    ngOnInit(): void {
        // The form controls are added dynamically inside the ControlRendererComponent
        this.initializeFormControls();
    }

    // Initializes form controls based on the provided section configurations
    initializeFormControls(): void {
        this.sectionConfigs.forEach((section) => {
            section.controls.forEach((controlConfig) => {
                const control = this.controlService.createFormControl(controlConfig);
                this.formGroup.addControl(controlConfig.key, control);
            });
        });
    }

    // Handle form submission
    onSubmit(): void {
        if (this.formGroup.valid) {
            console.log('Form Submitted', this.formGroup.value);
        } else {
            console.log('Form is invalid');
        }
    }
}
