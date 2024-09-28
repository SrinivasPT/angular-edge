import { Component } from '@angular/core';
import { DemoPageTwoComponent } from './demo/demo-page-two';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [DemoPageTwoComponent],
    template: `<app-demo-page-two></app-demo-page-two>`,
})
export class AppComponent {
    title = 'angular-edge';
}
