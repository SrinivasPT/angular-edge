import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlConfig } from '../core/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-simple-table-control',
    template: `
        <div>
            <button mat-raised-button color="primary" *ngIf="!isEditMode" (click)="toggleEditMode()">Edit</button>
            <ng-container *ngIf="isEditMode">
                <button mat-raised-button color="primary" (click)="toggleEditMode()">Save</button>
                <button mat-raised-button color="warn" (click)="cancelEdit()">Cancel</button>
            </ng-container>

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
                                    [data]="row[column.key]"
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
    editFormArray!: FormArray; // Holds data in edit mode for the current page

    displayedColumns: any[] = []; // Columns to be displayed
    displayedColumnKeys: string[] = []; // Column keys for template
    dataSource = new MatTableDataSource<any>(); // Data source for the table
    isEditMode = false; // Track edit mode
    editPageIndex!: number;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // Initialize displayed columns and keys
        this.displayedColumns = this.controlConfig?.columns || [];
        this.displayedColumnKeys = this.displayedColumns.map((col) => col.key);

        if (!this.formGroup.get(this.controlConfig.key)) {
            this.formGroup.addControl(this.controlConfig.key, new FormControl([]));
        }
        this.viewControl = this.formGroup.get(this.controlConfig.key) as FormControl;

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
    }

    // Toggle between view and edit mode
    toggleEditMode(): void {
        if (this.isEditMode) {
            // Exiting edit mode: save data back to 'address'
            this.saveTableData();
            this.editFormArray = null!;
        } else {
            // Entering edit mode: create FormArray for current page
            this.enterEditMode();
        }
        this.isEditMode = !this.isEditMode;
    }

    // Enter edit mode: create FormArray for current page data
    enterEditMode(): void {
        const currentPageData = this.getCurrentPageData();
        this.editFormArray = this.fb.array([]);
        this.editPageIndex = this.paginator.pageIndex;

        // Populate the FormArray with FormGroups for editing
        currentPageData.forEach((rowData: any) => {
            const rowFormGroup = this.fb.group({});
            // this.displayedColumns.forEach((col) => {
            //     rowFormGroup.addControl(col.key, this.fb.control(rowData[col.key]));
            // });
            this.editFormArray.push(rowFormGroup);
        });

        // Update dataSource to only current page data
        this.dataSource.data = currentPageData;
    }

    // Save the updated data back to the 'address' FormControl
    saveTableData(): void {
        const editedData = this.editFormArray.getRawValue();

        // Get full data
        const fullData = this.viewControl.value || [];

        // Get indices of current page data in full data
        const startIndex = this.editPageIndex * this.paginator.pageSize;
        const endIndex = startIndex + this.paginator.pageSize;

        // Update only the current page data in fullData
        fullData.splice(startIndex, editedData.length, ...editedData);

        // Update 'address' with the edited data
        this.viewControl.setValue(fullData);

        // Update dataSource with the full data
        this.dataSource.data = fullData;
    }

    cancelEdit(): void {
        this.isEditMode = false;
        const fullData = this.viewControl.value || [];
        this.viewControl.setValue(fullData); // Revert to original data
        this.dataSource.data = fullData; // Update dataSource with original data
    }

    // Get the data for the current page
    getCurrentPageData(): any[] {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        const endIndex = startIndex + this.paginator.pageSize;
        return this.viewControl.value.slice(startIndex, endIndex);
    }

    // Get the FormGroup for a specific row
    getRowFormGroup(rowIndex: number): FormGroup {
        return this.editFormArray.at(rowIndex) as FormGroup;
    }

    // Get the ControlConfig for a specific column
    getControl(key: string): ControlConfig {
        return this.displayedColumns.find((column) => column.key === key) as ControlConfig;
    }
}
