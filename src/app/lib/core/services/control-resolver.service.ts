import { Injectable, ViewContainerRef, Type, EnvironmentInjector, NgModuleRef } from '@angular/core';
import { ControlConfig } from '../models';
import { FormGroup } from '@angular/forms';

import {
    TextControlComponent,
    DateControlComponent,
    SelectControlComponent,
    SectionControlComponent,
    SimpleTableControlComponent,
} from '../../controls';
import { SharedModule } from '@edge/shared.module';

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

    constructor(private environmentInjector: EnvironmentInjector) {}

    // Method to resolve and create the appropriate component dynamically
    resolveControl(typeCode: string, container: ViewContainerRef, controlConfig: ControlConfig, formGroup: FormGroup): void {
        console.log('Resolving control for type:', typeCode);
        const component = this.controlMap[typeCode];
        if (component) {
            const componentRef = container.createComponent(component, {
                ngModuleRef: container.injector.get(NgModuleRef<SharedModule>),
            });
            componentRef.instance.controlConfig = controlConfig;
            componentRef.instance.formGroup = formGroup;
        } else {
            console.error(`Unknown control type: ${typeCode}`);
        }
    }
}
