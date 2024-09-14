// src/app/pages/sample-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextControlComponent } from '../controls/text-control.component';
import { DateControlComponent } from '../controls/date-control.component';
import { SelectControlComponent } from '../controls/select-control.component';
import { ControlConfig } from '../core/models';
import { ControlService } from '../core/services';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
    selector: 'app-demo-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, TextControlComponent, DateControlComponent, SelectControlComponent],
    template: `
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" fxLayout="row wrap" fxLayoutGap="20px" class="sample-form">
            <app-text-control [controlConfig]="textConfig" [formGroup]="formGroup"></app-text-control>
            <app-date-control [controlConfig]="dateConfig" [formGroup]="formGroup"></app-date-control>
            <app-select-control [controlConfig]="selectConfig" [formGroup]="formGroup"></app-select-control>
            <app-text-control [controlConfig]="textConfig" [formGroup]="formGroup"></app-text-control>
            <app-date-control [controlConfig]="dateConfig" [formGroup]="formGroup"></app-date-control>
            <app-select-control [controlConfig]="selectConfig" [formGroup]="formGroup"></app-select-control>
            <button type="submit" [disabled]="formGroup.invalid">Submit</button>
        </form>
    `,
})
export class DemoFormComponent implements OnInit {
    formGroup: FormGroup;

    // Define configuration objects for each control
    textConfig: ControlConfig = {
        key: 'userName',
        label: 'User Name',
        required: true,
        maxLength: 20,
        placeholder: 'Enter your name',
        width: 'one-third',
    };

    dateConfig: ControlConfig = {
        key: 'startDate',
        label: 'Start Date',
        required: true,
        minDate: '2023-01-01',
        maxDate: '2024-12-31',
        defaultValue: '2023-05-01',
        width: 'one-third',
    };

    selectConfig: ControlConfig = {
        key: 'loanType',
        label: 'Loan Type',
        required: true,
        categoryCode: 'LOAN_TYPE',
        placeholder: 'Select a loan type',
        width: 'one-third',
    };

    constructor(private controlService: ControlService) {
        this.formGroup = new FormGroup({});
    }

    ngOnInit(): void {
        // Initialize controls using ControlService if needed, currently done within components
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            console.log('Form Submitted', this.formGroup.value);
        } else {
            console.log('Form is invalid');
        }
    }
}
