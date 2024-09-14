import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextControlComponent } from '../controls/text-control.component';
import { DateControlComponent } from '../controls/date-control.component';
import { SelectControlComponent } from '../controls/select-control.component';
import { ControlConfig } from '../core/models';
import { ControlService } from '../core/services';
import { FlexLayoutModule } from '@angular/flex-layout'; // Optional, if needed for layout

@Component({
    selector: 'app-control-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, TextControlComponent, DateControlComponent, SelectControlComponent],
    template: `
        <div [formGroup]="formGroup" fxLayout="row wrap" fxLayoutGap="20px">
            <ng-container *ngFor="let config of controlConfigs">
                <ng-container [ngSwitch]="config.typeCode">
                    <app-text-control
                        *ngSwitchCase="'TEXT'"
                        [controlConfig]="config"
                        [formGroup]="formGroup"
                        [ngClass]="config.width"
                        fxFlex
                    ></app-text-control>

                    <app-date-control
                        *ngSwitchCase="'DATE'"
                        [controlConfig]="config"
                        [formGroup]="formGroup"
                        [ngClass]="config.width"
                        fxFlex
                    ></app-date-control>

                    <app-select-control
                        *ngSwitchCase="'SELECT'"
                        [controlConfig]="config"
                        [formGroup]="formGroup"
                        [ngClass]="config.width"
                        fxFlex
                    ></app-select-control>

                    <!-- Add more cases for other control types if needed -->

                    <!-- Default case if control type is not recognized -->
                    <div *ngSwitchDefault class="unknown-control">Unknown control type: {{ config.typeCode }}</div>
                </ng-container>
            </ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlBuilderComponent implements OnInit {
    @Input() controlConfigs: ControlConfig[] = [];
    @Input() formGroup!: FormGroup;

    constructor(private controlService: ControlService) {}

    ngOnInit(): void {
        // Initialize controls if needed, but typically done within individual components
    }
}
