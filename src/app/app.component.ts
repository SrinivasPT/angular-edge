import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoFormComponent } from './demo/demo-page';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, DemoFormComponent],
    template: `<app-demo-form></app-demo-form>`,
})
export class AppComponent {
    title = 'angular-edge';
}
