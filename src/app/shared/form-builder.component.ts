import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlConfig, SectionConfig } from '../core/models';
import { ControlService } from '../core/services';
import { SectionBuilderComponent } from './section-builder.component';

@Component({
    selector: 'app-form-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SectionBuilderComponent],
    template: `
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="form-renderer">
            <ng-container *ngFor="let section of sectionConfigs">
                <app-section-builder [sectionConfig]="section" [formGroup]="formGroup"></app-section-builder>
            </ng-container>
            <button type="submit" [disabled]="formGroup.invalid" class="submit-button">Submit</button>
        </form>
    `,

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent {
    @Input() sectionConfigs: SectionConfig[] = [];
    @Input() formGroup!: FormGroup;

    constructor(private fb: FormBuilder, private controlService: ControlService) {
        this.formGroup = this.fb.group({});
    }

    // Handle form submission
    onSubmit(): void {
        console.log('Form Submitted', this.formGroup.value);
        console.log('Form statu is', this.formGroup.valid);
    }
}
