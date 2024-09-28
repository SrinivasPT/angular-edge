import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-table-control',
    template: `
        <div [formGroup]="tableFormGroup">
            <h1>Table</h1>
            <div class="table-header">
                <h3>{{ controlConfig.title }}</h3>
                <mat-form-field *ngIf="controlConfig.filterable" appearance="outline">
                    <mat-label>Filter</mat-label>
                    <input matInput (keyup)="applyFilter($event)" placeholder="Filter data" />
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="toggleEditMode()">
                    {{ isEditMode ? 'View Mode' : 'Edit Mode' }}
                </button>
            </div>

            <table mat-table [dataSource]="filteredDataSource" matSort>
                <!-- Define Columns Based on ControlConfig -->
                <ng-container *ngFor="let column of controlConfig.columns" [matColumnDef]="column.key">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.label }}</th>
                    <td mat-cell *matCellDef="let row; let rowIndex = index">
                        <!-- In View Mode -->
                        {{ getRowValue(rowIndex, column.key) }}
                    </td>
                </ng-container>

                <!-- Pagination and Sorting -->
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>

            <!-- Pagination Control -->
            <mat-paginator
                *ngIf="controlConfig.pagination"
                [pageSizeOptions]="[5, 10, 20]"
                [pageSize]="controlConfig.pageSize"
                showFirstLastButtons
            ></mat-paginator>
        </div>
    `,
    styleUrls: ['./table-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig; // The table configuration
    @Input() formGroup!: FormGroup; // The form group passed in from the parent

    tableFormGroup!: FormGroup;
    displayedColumns: string[] = []; // Columns to be displayed
    isEditMode = false; // Switch between view and edit mode
    filteredDataSource: any[] = []; // Filtered data
    rowForms!: FormArray; // FormArray for rows

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // Initialize the table form group and rows
        this.tableFormGroup = this.fb.group({
            rows: (this.formGroup.get('rows') as FormArray) || this.fb.array([]), // Use FormArray from parent formGroup
        });
        this.formGroup.addControl(this.controlConfig.key, this.tableFormGroup);
        this.rowForms = this.tableFormGroup.get('rows') as FormArray;

        this.initializeTable();
    }

    // Initialize table configurations and form
    initializeTable(): void {
        this.displayedColumns = this.controlConfig?.columns?.map((col) => col.key) || [];
        this.filteredDataSource = this.rowForms.controls;
    }

    // Toggle between view and edit mode
    toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
    }

    // Get the value of a row in view mode
    getRowValue(index: number, key: string): string {
        return (this.rowForms.at(index) as FormGroup).get(key)?.value || '';
    }

    // Apply filter to table
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        // Apply filter logic to formGroup rows
    }
}
