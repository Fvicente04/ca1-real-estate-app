import { Component } from '@angular/core';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    IonApp,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent {
  appTitle = 'Real Estate App';
}