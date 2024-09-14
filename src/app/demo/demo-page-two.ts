import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ControlService } from '../core/services';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SectionBuilderComponent } from '../shared';
import { PageConfig, SectionConfig } from '../core/models';

@Component({
    selector: 'app-demo-page-two',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, SectionBuilderComponent],
    template: `
        <form [formGroup]="formGroup" class="form-renderer">
            <ng-container *ngFor="let section of sectionsToRender">
                <app-section-builder [sectionConfig]="section" [formGroup]="formGroup"></app-section-builder>
            </ng-container>
            <button (click)="onSubmit()">Submit</button>
        </form>
    `,
})
export class DemoPageTwoComponent implements OnInit {
    formGroup: FormGroup;
    pageConfig!: PageConfig; // Holds the full configuration
    sectionsToRender: SectionConfig[] = []; // Holds sections to render on the form

    constructor(private fb: FormBuilder, private controlService: ControlService) {
        this.formGroup = this.fb.group({});
    }

    ngOnInit(): void {
        this.loadConfig();
    }

    // Load the configuration JSON
    loadConfig(): void {
        // Simulating loading from JSON file (typically would use a service or HTTP request)
        import('./demo-page-config.json').then((config: PageConfig) => {
            this.pageConfig = config;
            this.sectionsToRender = this.pageConfig.sectionRepository.filter((section) =>
                this.pageConfig.sections.includes(section.sectionId)
            );
            // this.initializeFormControls();
        });
    }

    onSubmit(): void {
        console.log('Form Submitted', this.formGroup.value);
        console.log('Form statu is', this.formGroup.valid);
    }
}
