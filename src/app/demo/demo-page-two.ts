import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlService } from '../core/services';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SectionBuilderComponent } from '../shared';
import { PageConfig, SectionConfig } from '../core/models';
import { FormBuilderComponent } from '../shared/form-builder.component';

@Component({
    selector: 'app-demo-page-two',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, SectionBuilderComponent, FormBuilderComponent],
    template: `
        <ng-container *ngIf="pageConfig">
            <app-form-builder [sectionConfigs]="pageConfig.sectionRepository" [formGroup]="formGroup"> </app-form-builder>
            <button type="submit" (click)="onSubmit()">Submit</button>
        </ng-container>
    `,
})
export class DemoPageTwoComponent implements OnInit {
    formGroup: FormGroup;
    pageConfig!: PageConfig; // Holds the full configuration

    constructor(private fb: FormBuilder, private controlService: ControlService) {
        this.formGroup = this.fb.group({});
    }

    ngOnInit(): void {
        this.loadConfig();
    }

    // Load the configuration JSON
    loadConfig(): void {
        // Simulating loading from JSON file (typically would use a service or HTTP request)
        import('./demo-page-config.json').then((config: any) => {
            this.pageConfig = config;
        });
    }

    onSubmit(): void {
        console.log('Form Submitted', this.formGroup.value);
        console.log('Form statu is', this.formGroup.valid);
    }
}
