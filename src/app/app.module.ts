// src/app/app.module.ts (or another module where you manage imports)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout'; // Import FlexLayoutModule
import { DemoFormComponent } from './demo/demo-page';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        FlexLayoutModule, // Add FlexLayoutModule here
    ],
    bootstrap: [
        /* Your Main Component */
    ],
})
export class AppModule {}
