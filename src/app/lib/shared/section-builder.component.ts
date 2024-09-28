import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SectionConfig } from '../core/models';

@Component({
    selector: 'app-section-builder',
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
