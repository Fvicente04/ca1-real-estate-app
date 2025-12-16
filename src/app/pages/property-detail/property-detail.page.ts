import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Import property service and model
import { PropertyService } from '../../services/property';
import { Property } from '../../models/property.model';

// Google Maps types
declare var google: any;

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    DecimalPipe,
    SlicePipe,
  ],
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
})
export class PropertyDetailPage implements OnInit, AfterViewInit {
  //Reference to map HTML element
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  //Property ID from URL
  
  propertyId = '';

  //Current property
  
  property: Property | null = null;

  //Related properties

  relatedProperties: Property[] = [];

  //Loading states

  loading = true;
  loadingMap = false;
  mapError = '';

  //Google Maps instance

  map: any;
  marker: any;

  //Dublin city center coordinates (fallback)

  dublinCenter = {
    lat: 53.3498,
    lng: -6.2603
  };

  //Constructor
   
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  //Initialize component
  
  ngOnInit() {
    // Get property ID from route
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';

    if (this.propertyId) {
      this.loadProperty();
    } else {
      this.loading = false;
    }
  }

  //After view init - initialize map

  ngAfterViewInit() {
    // Map will be initialized after property loads
  }

  //Load property from Firestore

  loadProperty() {
    this.loading = true;

    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (property) => {
        this.property = property;
        this.loading = false;

        // Load related properties
        this.loadRelatedProperties();

        // Initialize map after property loaded
        setTimeout(() => {
          this.initializeMap();
        }, 500);
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.property = null;
        this.loading = false;
      }
    });
  }

  /**
   * Load related properties
   */
  loadRelatedProperties() {
    if (!this.property) return;

    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        // Filter out current property and limit to 6
        this.relatedProperties = properties
          .filter(p => p.id !== this.propertyId)
          .slice(0, 6);
      },
      error: (error) => {
        console.error('Error loading related properties:', error);
      }
    });
  }

  //Initialize Google Maps

  initializeMap() {
    if (!this.mapElement || !this.property) {
      return;
    }

    if (typeof google === 'undefined') {
      this.mapError = 'Google Maps not loaded. Please add API key to index.html';
      return;
    }

    this.loadingMap = true;

    try {
      // Get coordinates for this property
      const coordinates = this.getCoordinatesForLocation(this.property.Location);

      // Create map
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: coordinates,
        zoom: 15,
        styles: this.getMapStyles(),
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add marker for this property
      this.marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        title: this.property.Title,
        icon: this.getMarkerIcon(this.property.Featured || false),
        animation: google.maps.Animation.DROP,
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: this.getInfoWindowContent(),
      });

      // Show info window on marker click
      this.marker.addListener('click', () => {
        infoWindow.open(this.map, this.marker);
      });

      // Auto-open info window
      setTimeout(() => {
        infoWindow.open(this.map, this.marker);
      }, 500);

      this.loadingMap = false;
    } catch (error) {
      console.error('Error initializing map:', error);
      this.mapError = 'Error loading map. Please refresh the page.';
      this.loadingMap = false;
    }
  }

  // Get coordinates for location

  getCoordinatesForLocation(location: string): { lat: number; lng: number } {
    const locationMap: { [key: string]: { lat: number; lng: number } } = {
      'Dublin 1': { lat: 53.3521, lng: -6.2602 },
      'Dublin 2': { lat: 53.3381, lng: -6.2592 },
      'Dublin 3': { lat: 53.3566, lng: -6.2180 },
      'Dublin 4': { lat: 53.3311, lng: -6.2297 },
      'Dublin 6': { lat: 53.3198, lng: -6.2603 },
      'Dublin 7': { lat: 53.3555, lng: -6.2847 },
      'Dublin 8': { lat: 53.3368, lng: -6.2826 },
      'Clontarf': { lat: 53.3661, lng: -6.2003 },
      'Malahide': { lat: 53.4509, lng: -6.1543 },
      'Howth': { lat: 53.3884, lng: -6.0658 },
    };

    for (const [key, coords] of Object.entries(locationMap)) {
      if (location.includes(key)) {
        return {
          lat: coords.lat + (Math.random() - 0.5) * 0.005,
          lng: coords.lng + (Math.random() - 0.5) * 0.005,
        };
      }
    }

    // Default to Dublin center
    return this.dublinCenter;
  }

  //Get marker icon

  getMarkerIcon(isFeatured: boolean) {
    return {
      url: isFeatured
        ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48"><path fill="%233b82f6" d="M20 0C9 0 0 9 0 20c0 16 20 28 20 28s20-12 20-28c0-11-9-20-20-20zm0 27c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>'
        : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44"><path fill="%2364748b" d="M18 0C8.1 0 0 8.1 0 18c0 14 18 26 18 26s18-12 18-26c0-9.9-8.1-18-18-18zm0 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>',
      scaledSize: new google.maps.Size(isFeatured ? 40 : 36, isFeatured ? 48 : 44),
    };
  }

  //Get info window content

  getInfoWindowContent(): string {
    if (!this.property) return '';

    return `
      <div style="padding: 8px; max-width: 220px;">
        <h3 style="margin: 0 0 6px; font-size: 14px; font-weight: 700; color: #0f172a;">${this.property.Title}</h3>
        <p style="margin: 0 0 4px; font-size: 12px; color: #64748b;">📍 ${this.property.Location}</p>
        <p style="margin: 0; font-size: 16px; font-weight: 700; color: #3b82f6;">€${this.property.Price.toLocaleString()}</p>
      </div>
    `;
  }

  //Custom map styles

  getMapStyles() {
    return [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#dbeafe' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#3b82f6' }],
      },
    ];
  }

  //Navigate back

  goBack() {
    this.router.navigate(['/properties']);
  }

  //Navigate to contact with property pre-filled

  bookViewing() {
    if (this.property) {
      this.router.navigate(['/contact'], {
        queryParams: { property: this.property.Title }
      });
    }
  }

  //Open another property detail page

  openProperty(id: string | undefined) {
    if (id) {
      this.router.navigate(['/property-detail', id]);
      // Reload page data
      this.propertyId = id;
      this.loadProperty();
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }
}