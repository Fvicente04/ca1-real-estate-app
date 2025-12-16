import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonIcon,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  bedOutline, 
  waterOutline, 
  resizeOutline, 
  homeOutline 
} from 'ionicons/icons';

import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property';

@Component({
  selector: 'app-properties',
  standalone: true,
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonIcon,
    NgForOf,
    NgIf,
  ],
})
export class PropertiesPage implements OnInit {
  properties: Property[] = [];
  loading = true;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {
    // Register icons for property specs
    addIcons({
      'bed-outline': bedOutline,
      'water-outline': waterOutline,
      'resize-outline': resizeOutline,
      'home-outline': homeOutline,
    });
  }

  ngOnInit() {
    // Fetch properties from Firestore and subscribe to updates
    this.propertyService
      .getProperties()
      .subscribe((props: Property[]) => {
        this.properties = props;
        this.loading = false;
      });
  }

  // Format price to Euro currency 
  formatPrice(price: number | undefined): string {
    if (price == null) return '';

    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Navigate to property detail page
  openProperty(id?: string) {
    if (!id) return;
    this.router.navigate(['/property-detail', id]);
  }
}