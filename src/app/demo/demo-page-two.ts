import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PageConfig } from '@edge/core/models';
import { ConfigService } from '@edge/core/services';
import { SharedModule } from '@edge/shared.module';

@Component({
    selector: 'app-demo-page-two',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, SharedModule],
    template: `
        <div [formGroup]="formGroup" style="width: 100%;">
            <ng-container *ngIf="formLoading">
                <p>Loading configuration, please wait...</p>
            </ng-container>

            <ng-container *ngIf="!formLoading">
                <app-form-builder [pageConfig]="pageConfig" [formGroup]="formGroup"> </app-form-builder>
                <button type="submit" (click)="onSubmit()">Submit</button>
            </ng-container>
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
        this.configService.loadConfig().subscribe((data) => {
            this.pageConfig = data as PageConfig; // Assign the loaded configuration
            this.formLoading = false;
        });
    }

    ngAfterViewInit(): void {
        this.configService.getData().subscribe((data: any) => {
            this.formGroup.patchValue(data);
        });
    }

    onSubmit(): void {
        console.log('Form Submitted', this.formGroup.value);
        console.log('Form status is', this.formGroup.valid);
    }
}
