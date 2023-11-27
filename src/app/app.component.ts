import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    user = signal<any>(null);

    changeUser(user: string) {
        this.user.set(user);
    };
  
}
