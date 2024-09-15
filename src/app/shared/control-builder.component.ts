// control-builder.component.ts
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlConfig } from '../core/models';
import { ControlResolverService } from '../core/services/control-resolver.service';
import { FlexLayoutModule } from '@angular/flex-layout'; // Optional, if needed for layout

@Component({
    selector: 'app-control-builder',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule],
    template: ` <ng-container #dynamicContainer></ng-container> `,
})
export class ControlBuilderComponent implements OnInit {
    @Input() controlConfig!: ControlConfig;
    @Input() formGroup!: FormGroup;
    @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

    constructor(private controlResolver: ControlResolverService) {}

    ngOnInit(): void {
        // Use the resolver to dynamically render the appropriate component
        this.controlResolver.resolveControl(this.controlConfig.typeCode as string, this.container, this.controlConfig, this.formGroup);
    }
}
