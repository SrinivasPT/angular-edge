import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageConfig, SectionConfig } from '../core/models';
import { ConfigService } from '../core/services';
import { SectionBuilderComponent } from './section-builder.component';

@Component({
    selector: 'app-form-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SectionBuilderComponent],
    template: `
        <ng-container>
            <h2>{{ pageConfig.title }}</h2>
            <ng-container *ngFor="let section of sections">
                <app-section-builder [sectionConfig]="section" [formGroup]="formGroup"></app-section-builder>
            </ng-container>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
    @Input() pageConfig!: PageConfig;
    @Input() formGroup!: FormGroup;
    sections!: SectionConfig[];

    constructor(private configService: ConfigService) {}

    ngOnInit(): void {
        this.sections = this.configService.getFormSections();
    }
}
