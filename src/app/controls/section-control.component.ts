import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlConfig, SectionConfig } from '../core/models';
import { ControlBuilderComponent } from '../shared';
import { ConfigService } from '../core/services';

@Component({
    selector: 'app-section-control',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ControlBuilderComponent],
    template: `
        <div [formGroup]="sectionGroup">
            <fieldset>
                <legend>{{ sectionConfig.title }}</legend>
                <ng-container *ngFor="let control of sectionConfig.controls">
                    <app-control-builder [controlConfig]="control" [formGroup]="sectionGroup"> </app-control-builder>
                </ng-container>
            </fieldset>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    sectionGroup!: FormGroup;
    sectionConfig!: SectionConfig;

    constructor(private fb: FormBuilder, private configService: ConfigService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.sectionGroup = this.fb.group({});
        this.formGroup.addControl(this.controlConfig.key, this.sectionGroup);
        this.loadControls();
    }

    loadControls(): void {
        this.sectionConfig = this.configService.getSectionConfig(this.controlConfig.sectionKey || '') as SectionConfig;
    }
}
