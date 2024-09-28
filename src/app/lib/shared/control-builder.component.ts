// control-builder.component.ts
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlConfig } from '../core/models';
import { ControlResolverService } from '../core/services/control-resolver.service';

@Component({
    selector: 'app-control-builder',
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
