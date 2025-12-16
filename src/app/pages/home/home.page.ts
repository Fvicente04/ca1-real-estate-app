import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSpinner} from '@ionic/angular/standalone';
import {DecimalPipe, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonSpinner,
    DecimalPipe,
    SlicePipe,
    RouterLink,
  ],
})
export class HomePage implements OnInit {
  properties: Property[] = [];
  loading = true;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch properties from Firestore and subscribe to updates
    this.propertyService
      .getProperties()
      .subscribe((props: Property[]) => {
        this.properties = props;
        this.loading = false;
      });
  }

  // Format price to Euro currency (e.g. 250000 -> "€250,000")
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