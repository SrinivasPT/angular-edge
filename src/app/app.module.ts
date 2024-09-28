// src/app/app.module.ts (or another module where you manage imports)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@edge/shared.module';
import { AppComponent } from './app.component';
import { DemoPageTwoComponent } from './demo/demo-page-two';

@NgModule({
    declarations: [],
    imports: [BrowserModule, SharedModule, DemoPageTwoComponent],
    exports: [SharedModule],
    bootstrap: [],
})
export class AppModule {}
