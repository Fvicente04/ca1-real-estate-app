import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';

import { ViewingService } from '../../services/viewing.service';
import { Viewing } from '../../models/viewing.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  // Form state flags
  submitting = false;
  success = false;
  error = '';

  // Form data object
  viewing: Viewing = {
    name: '',
    email: '',
    date: '',
    time: '',
    property: '',
    notes: ''
  };

  constructor(
    private viewingService: ViewingService,
    private route: ActivatedRoute
  ) {
    // Register icons for success/error messages
    addIcons({
      'checkmark-circle-outline': checkmarkCircleOutline,
      'alert-circle-outline': alertCircleOutline,
    });
  }

  ngOnInit(): void {
    // Pre-fill property field if passed via URL query param
    // Example: /contact?property=Modern Apartment
    this.route.queryParams.subscribe(params => {
      if (params['property']) {
        this.viewing.property = params['property'];
      }
    });
  }

  submitForm(form: NgForm): void {
    // Don't submit if form is invalid or already submitting
    if (form.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.success = false;
    this.error = '';

    // Save viewing request to Firestore
    this.viewingService.createViewing(this.viewing)
      .then(() => {
        this.submitting = false;
        this.success = true;

        // Reset form
        form.resetForm();
        this.viewing = {
          name: '',
          email: '',
          date: '',
          time: '',
          property: '',
          notes: ''
        };

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.success = false;
        }, 5000);
      })
      .catch((err: any) => {
        console.error('Error saving viewing:', err);
        this.submitting = false;
        this.error = 'Sorry, there was a problem sending your request. Please try again.';

        // Hide error message after 7 seconds
        setTimeout(() => {
          this.error = '';
        }, 7000);
      });
  }
}