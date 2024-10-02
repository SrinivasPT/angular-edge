import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlBuilderComponent, FormBuilderComponent, SectionBuilderComponent } from './shared';
import { TextControlComponent, DateControlComponent, SelectControlComponent, TableControlComponent } from './controls';

@NgModule({
    declarations: [
        FormBuilderComponent,
        SectionBuilderComponent,
        ControlBuilderComponent,
        //
        TextControlComponent,
        DateControlComponent,
        SelectControlComponent,
        TableControlComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        //
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        //
        FlexLayoutModule,
    ],
    exports: [
        FormBuilderComponent,
        SectionBuilderComponent,
        ControlBuilderComponent,
        //
        TextControlComponent,
        DateControlComponent,
        SelectControlComponent,
        TableControlComponent,
        //
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        //
        FlexLayoutModule,
    ],
})
export class SharedModule {}
