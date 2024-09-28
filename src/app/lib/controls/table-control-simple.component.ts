import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-simple-table-control',
    template: `
        <div [formGroup]="tableFormGroup">
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
                            <app-control-builder [controlConfig]="getControl(column.key)" [formGroup]="getRowFormGroup(rowIndex)">
                            </app-control-builder>
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
            <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableControlComponent implements OnInit {
    @Input() controlConfig!: ControlConfig; // The table configuration
    @Input() formGroup!: FormGroup; // The form group passed in from the parent

    tableControl!: FormControl;
    tableFormGroup!: FormGroup;
    rowForms: FormGroup[] = []; // Form groups for each row

    displayedColumns: any[] = []; // Columns to be displayed
    displayedColumnKeys: string[] = []; // Column keys for template
    dataSource: any[] = []; // Data source for the table
    isEditMode = false; // Track edit mode

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.tableControl = new FormControl([]);
        this.tableFormGroup = this.fb.group({});
        this.formGroup.addControl(this.controlConfig.key, this.tableControl);
        this.initializeTable();
        this.tableControl.valueChanges.subscribe((newValue) => {
            this.dataSource = newValue;
            this.initializeTable();
        });
    }

    // Initialize table configurations and bind to formGroup data
    initializeTable(): void {
        this.displayedColumns = this.controlConfig?.columns || [];
        this.displayedColumnKeys = this.displayedColumns.map((col) => col.key); // Prepare keys for template
        this.dataSource = this.formGroup.get(this.controlConfig.key)?.value || [];

        // Initialize controls for each row and column
        this.dataSource.forEach((row: any, rowIndex: number) => {
            const rowFormGroup = this.fb.group({});
            this.displayedColumns.forEach((col) => {
                rowFormGroup.addControl(col.key, this.fb.control(row[col.key]));
            });
            this.rowForms[rowIndex] = rowFormGroup;
            this.tableFormGroup.addControl(rowIndex.toString(), rowFormGroup);
        });
    }

    // Toggle between view and edit mode
    toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
        if (!this.isEditMode) {
            // Save the changes back to the form when toggling out of edit mode
            this.saveTableData();
        }
    }

    // Save the updated data back to the form group
    saveTableData(): void {
        const updatedData = this.rowForms.map((rowFormGroup) => rowFormGroup.value);
        this.formGroup.get(this.controlConfig.key)?.setValue(updatedData);
    }

    // Get the FormControl for a specific row and column in edit mode
    getControl(key: string): ControlConfig {
        return this.displayedColumns.find((column) => column.key === key) as ControlConfig;
    }

    getRowFormGroup(rowIndex: number): FormGroup {
        const group = this.tableFormGroup.get(rowIndex.toString());
        if (!group) {
            console.error(`FormGroup for row ${rowIndex} not found`);
        }
        return group as FormGroup;
    }
}
