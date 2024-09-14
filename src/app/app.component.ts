import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoPageOneComponent } from './demo/demo-page-one';
import { DemoPageTwoComponent } from './demo/demo-page-two';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, DemoPageOneComponent, DemoPageTwoComponent],
    template: `<app-demo-page-two></app-demo-page-two>`,
})
export class AppComponent {
    title = 'angular-edge';
}
