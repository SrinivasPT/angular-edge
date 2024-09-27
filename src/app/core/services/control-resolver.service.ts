// control-resolver.service.ts
import { Injectable, ViewContainerRef, Type } from '@angular/core';
import {
    DateControlComponent,
    SectionControlComponent,
    SelectControlComponent,
    SimpleTableControlComponent,
    TableControlComponent,
    TextControlComponent,
} from '../../controls';
import { ControlConfig } from '../models';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ControlResolverService {
    // Map of control types to their respective components
    private controlMap: { [key: string]: Type<any> } = {
        TEXT: TextControlComponent,
        DATE: DateControlComponent,
        SELECT: SelectControlComponent,
        SECTION: SectionControlComponent,
        TABLE: SimpleTableControlComponent,
    };

    constructor() {}

    // Method to resolve and create the appropriate component dynamically
    resolveControl(typeCode: string, container: ViewContainerRef, controlConfig: ControlConfig, formGroup: FormGroup): void {
        console.log('Resolving control for type:', typeCode); // Add logging here
        const component = this.controlMap[typeCode];
        if (component) {
            // Create the component directly without using ComponentFactoryResolver
            const componentRef = container.createComponent(component);
            componentRef.instance.controlConfig = controlConfig;
            componentRef.instance.formGroup = formGroup;
        } else {
            console.error(`Unknown control type: ${typeCode}`);
        }
    }
}
