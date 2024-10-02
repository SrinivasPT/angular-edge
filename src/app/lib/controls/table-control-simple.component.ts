import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlConfig } from '../core/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-simple-table-control',
    template: `
        <div>
            <button mat-raised-button color="primary" (click)="toggleEditMode()">
                {{ isEditMode ? 'Save' : 'Edit' }}
            </button>

            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
                <!-- Define Columns Based on ControlConfig -->
                <ng-container *ngFor="let column of displayedColumns" [matColumnDef]="column.key">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.label }}</th>

                    <!-- Cell Definition: Render input field if in edit mode -->
                    <td mat-cell *matCellDef="let row; let rowIndex = index">
                        <ng-container *ngIf="isEditMode; else viewMode">
                            <div [formGroup]="getRowFormGroup(rowIndex)">
                                <app-control-builder
                                    [controlConfig]="getControl(column.key)"
                                    [formGroup]="getRowFormGroup(rowIndex)"
                                ></app-control-builder>
                            </div>
                        </ng-container>
                        <ng-template #viewMode>
                            {{ row[column.key] }}
                        </ng-template>
                    </td>
                </ng-container>

                <!-- Table Header and Rows -->
                <tr mat-header-row *matHeaderRowDef="displayedColumnKeys"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumnKeys"></tr>
            </table>

            <!-- Pagination Control -->
            <mat-paginator #paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class SimpleTableControlComponent implements OnInit, AfterViewInit {
    @Input() controlConfig!: ControlConfig; // The table configuration
    @Input() formGroup!: FormGroup; // The form group passed in from the parent

    // Form controls
    viewControl!: FormControl; // Holds data in view mode under 'address'
    editFormArray!: FormArray; // Holds data in edit mode under 'addressEdit'

    displayedColumns: any[] = []; // Columns to be displayed
    displayedColumnKeys: string[] = []; // Column keys for template
    dataSource = new MatTableDataSource<any>(); // Data source for the table
    isEditMode = false; // Track edit mode

    // Store FormGroups for each row in view mode
    viewRowForms: { [key: number]: FormGroup } = {};

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // Initialize displayed columns and keys
        this.displayedColumns = this.controlConfig?.columns || [];
        this.displayedColumnKeys = this.displayedColumns.map((col) => col.key);

        // Ensure 'address' FormControl exists
        if (!this.formGroup.get(this.controlConfig.key)) {
            this.formGroup.addControl(this.controlConfig.key, new FormControl([]));
        }
        this.viewControl = this.formGroup.get(this.controlConfig.key) as FormControl;

        // Initialize the table with the data from 'address'
        this.initializeTable();

        // Subscribe to viewControl valueChanges to repaint the grid when data changes
        this.viewControl.valueChanges.subscribe(() => {
            this.initializeTable();
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    // Initialize the table data
    initializeTable(): void {
        // Update dataSource with the latest value from viewControl
        this.dataSource.data = this.viewControl.value || [];

        // Clear viewRowForms
        this.viewRowForms = {};

        // Construct FormGroups for each row in view mode
        if (!this.isEditMode) {
            this.dataSource.data.forEach((row: any, rowIndex: number) => {
                const rowFormGroup = this.fb.group({});
                this.displayedColumns.forEach((col) => {
                    rowFormGroup.addControl(col.key, this.fb.control(row[col.key]));
                });
                this.viewRowForms[rowIndex] = rowFormGroup;
            });
        }
    }

    // Toggle between view and edit mode
    toggleEditMode(): void {
        if (this.isEditMode) {
            // Exiting edit mode: save data back to 'address' and clean up
            this.saveTableData();
            this.formGroup.removeControl(this.controlConfig.key + 'Edit');
            this.editFormArray = null!;
        } else {
            // Entering edit mode: create 'addressEdit' and populate it
            this.enterEditMode();
        }
        this.isEditMode = !this.isEditMode;
    }

    // Enter edit mode: create 'addressEdit' FormArray and populate it
    enterEditMode(): void {
        const viewData = this.viewControl.value || [];
        this.editFormArray = this.fb.array([]);

        // Populate the FormArray with FormGroups for editing
        viewData.forEach((rowData: any) => {
            const rowFormGroup = this.fb.group({});
            this.displayedColumns.forEach((col) => {
                rowFormGroup.addControl(col.key, this.fb.control(rowData[col.key]));
            });
            this.editFormArray.push(rowFormGroup);
        });

        this.formGroup.addControl(this.controlConfig.key + 'Edit', this.editFormArray);

        // Update dataSource for the table in edit mode
        this.dataSource.data = viewData;
    }

    // Save the updated data back to the 'address' FormControl
    saveTableData(): void {
        const editedData = this.editFormArray.getRawValue();
        // Update 'address' with the edited data
        this.viewControl.setValue(editedData);

        // Update dataSource for view mode
        this.dataSource.data = editedData;

        // Re-initialize the table to rebuild viewRowForms
        this.initializeTable();
    }

    // Get the FormGroup for a specific row
    getRowFormGroup(rowIndex: number): FormGroup {
        if (this.isEditMode) {
            return this.editFormArray.at(rowIndex) as FormGroup;
        } else {
            return this.viewRowForms[rowIndex];
        }
    }

    // Get the ControlConfig for a specific column
    getControl(key: string): ControlConfig {
        return this.displayedColumns.find((column) => column.key === key) as ControlConfig;
    }
}
