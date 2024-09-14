import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionConfig } from '../core/models';
import { ControlBuilderComponent } from './control-builder.component';

@Component({
    selector: 'app-section-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ControlBuilderComponent],
    template: `
        <div [ngClass]="sectionConfig.width" class="section-wrapper">
            <fieldset *ngIf="sectionConfig.typeCode === 'SECTION_CARD_WITH_HEADER'">
                <legend>{{ sectionConfig.sectionId.replace('-', ' ').toUpperCase() }}</legend>
                <app-control-builder [controlConfigs]="sectionConfig.controls" [formGroup]="formGroup"></app-control-builder>
            </fieldset>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionBuilderComponent implements OnInit {
    @Input() sectionConfig!: SectionConfig;
    @Input() formGroup!: FormGroup;

    ngOnInit(): void {
        // Additional initialization can be added here if necessary
    }
}
