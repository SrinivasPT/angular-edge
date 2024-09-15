import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionConfig } from '../core/models';
import { ControlBuilderComponent } from './control-builder.component';

@Component({
    selector: 'app-section-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ControlBuilderComponent],
    template: `
        <div [formGroup]="sectionFormGroup" class="form-renderer">
            <fieldset>
                <legend>{{ sectionConfig.title }}</legend>
                <app-control-builder
                    *ngFor="let control of sectionConfig.controls"
                    [controlConfig]="control"
                    [formGroup]="sectionFormGroup"
                    [ngClass]="control.width"
                ></app-control-builder>
            </fieldset>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionBuilderComponent implements OnInit {
    @Input() sectionConfig!: SectionConfig;
    @Input() formGroup!: FormGroup;
    sectionFormGroup!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // Create a child FormGroup for this section
        this.sectionFormGroup = this.fb.group({});

        // Add the new FormGroup to the passed in parent FormGroup
        this.formGroup.addControl(this.sectionConfig.key, this.sectionFormGroup);
    }
}
