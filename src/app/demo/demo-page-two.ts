import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../core/services';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageConfig } from '../core/models';
import { FormBuilderComponent } from '../shared/form-builder.component';

@Component({
    selector: 'app-demo-page-two',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, FormBuilderComponent],
    template: `
        <div [formGroup]="formGroup" style="width: 100%;">
            <ng-container *ngIf="formLoading">
                <p>Loading configuration, please wait...</p>
            </ng-container>

            <ng-container *ngIf="!formLoading">
                <app-form-builder [pageConfig]="pageConfig" [formGroup]="formGroup"> </app-form-builder>
                <button type="submit" (click)="onSubmit()">Submit</button>
            </ng-container>
            <div></div>
        </div>
    `,
})
export class DemoPageTwoComponent implements OnInit, AfterViewInit {
    formGroup: FormGroup;
    pageConfig!: PageConfig; // Holds the full configuration
    formLoading = true;

    constructor(private fb: FormBuilder, private configService: ConfigService) {
        this.formGroup = this.fb.group({});
    }

    ngOnInit(): void {
        this.loadConfig();
    }

    ngAfterViewInit(): void {
        // Check form readiness after view init
        this.populateFormWithData();
    }

    // Method to fetch and set the form data
    populateFormWithData(): void {
        this.configService.getData().subscribe((data: any) => {
            this.formGroup.patchValue(data); // Set the retrieved data to the form
        });
    }

    // Load the configuration JSON
    loadConfig(): void {
        this.configService.loadConfig().subscribe((data) => {
            this.pageConfig = data as PageConfig; // Assign the loaded configuration
            this.formLoading = false;
        });
    }

    onSubmit(): void {
        console.log('Form Submitted', this.formGroup.value);
        console.log('Form status is', this.formGroup.valid);
    }
}
