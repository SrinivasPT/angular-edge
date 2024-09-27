import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ControlConfig } from '../core/models';

@Component({
    selector: 'app-simple-table-control',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    template: `
        <div [formGroup]="formGroup">
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
                <!-- Define Columns Based on ControlConfig -->
                <ng-container *ngFor="let column of controlConfig.columns" [matColumnDef]="column.key">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{ column.label }}</th>
                    <td mat-cell *matCellDef="let row">{{ row[column.key] }}</td>
                </ng-container>

                <!-- Table Header and Rows -->
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
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

    tableGroup!: FormControl;
    displayedColumns: string[] = []; // Columns to be displayed
    dataSource: any[] = []; // Data source for the table

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.tableGroup = new FormControl([]);
        this.formGroup.addControl(this.controlConfig.key, this.tableGroup);
        this.initializeTable();
    }

    // Initialize table configurations and bind to formGroup data
    initializeTable(): void {
        this.displayedColumns = this.controlConfig?.columns?.map((col) => col.key) || [];
        this.dataSource = this.tableGroup.value || [];

        // Listen for formControl changes to dynamically update the table
        this.tableGroup.valueChanges.subscribe((newValue) => {
            this.dataSource = newValue;
        });
    }
}
