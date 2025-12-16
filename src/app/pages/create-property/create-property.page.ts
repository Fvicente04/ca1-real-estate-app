import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton,
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  alertCircleOutline, 
  checkmarkCircleOutline 
} from 'ionicons/icons';

// Import property service and model
import { PropertyService } from '../../services/property';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-create-property',
  standalone: true,
  templateUrl: './create-property.page.html',
  styleUrls: ['./create-property.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
  ],
})
export class CreatePropertyPage {
  //Flag indicating form is being submitted & Disables buttons during submission
  
  submitting = false;

  //Success message to display after creation
  
  successMessage = '';

  //Error message to display if submission fails

  errorMessage = '';

  //Comma-separated image URLs input & Will be converted to array before saving
   
  imageUrls = '';

  //Property object bound to form fields & Contains all property data
   
  property: Property = {
    Title: '',
    Location: '',
    Price: 0,
    Bedrooms: 0,
    Bathrooms: 0,
    Area: 0,
    Description: '',
    Images: [],
    Featured: false,
  };

  // Dependency Injection & Registers Ionic icons and injects services
  
  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {
    // Register Ionic icons used in template
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'alert-circle-outline': alertCircleOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
    });
  }

  //Handles form submission & Validates data, processes images, saves to Firestore
   
  submitForm(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validation: Check required fields
    if (!this.property.Title || !this.property.Location || 
        this.property.Price <= 0 || this.property.Bedrooms < 0 || 
        this.property.Bathrooms < 0 || this.property.Area <= 0 || 
        !this.property.Description) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    // Set submitting state
    this.submitting = true;

    // Process image URLs (convert comma-separated string to array)
    if (this.imageUrls.trim()) {
      this.property.Images = this.imageUrls
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);
    } else {
      // Default placeholder image if no images provided
      this.property.Images = ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'];
    }

    // Call PropertyService to save to Firestore
    this.propertyService.createProperty(this.property)
      .then(() => {
        // Success callback
        this.submitting = false;
        this.successMessage = 'Property created successfully!';

        // Redirect to properties page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/properties']);
        }, 2000);
      })
      .catch((error: any) => {
        // Error callback
        console.error('Error creating property:', error);
        this.submitting = false;
        this.errorMessage = 'Failed to create property. Please try again.';

        // Auto-hide error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      });
  }

  //Navigate back to properties list & Called when user clicks Cancel button
  goBack(): void {
    this.router.navigate(['/properties']);
  }
}