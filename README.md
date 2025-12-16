# Real Estate App

## Student Information
**Student ID:** 20002814  
**Module:** B8IS138 Mobile and Social Computing  
**Institution:** Dublin Business School  
**Academic Year:**2025

## Project Overview
This is a mobile-first real estate web application developed as part of the Mobile and Social Computing coursework. The application allows users to browse properties, view detailed information, request property viewings, and manage property listings. The project is built using Ionic Framework and Angular with Firebase as the backend service.

## Technologies Used
- Ionic Framework 7
- Angular 17 (Standalone Components)
- Firebase Authentication
- Firestore Database
- Google Maps JavaScript API
- TypeScript
- SCSS
- HTML5

## Main Features

### User Authentication
Users can register and log in using Firebase Authentication. The system includes form validation, error handling, and session persistence. Route guards protect authenticated-only pages.

### Property Browsing
The application displays a list of available properties in a responsive grid layout. Each property card shows the price, location, number of bedrooms and bathrooms, and area in square meters.

### Property Details
Each property has a dedicated detail page that includes multiple images, full description, specifications, and an embedded Google Map showing the property location. The page also displays related properties at the bottom.

### Viewing Requests
Users can request a property viewing by filling out a form on the contact page. The form includes fields for name, email, phone number, preferred date and time, property interest, and additional notes. All submissions are stored in Firestore.

### Property Management
Authenticated users can add new properties to the database through a dedicated form. The form includes all necessary fields such as title, location, price, specifications, description, and image URLs.

### Google Maps Integration
Property locations are displayed on interactive maps using the Google Maps JavaScript API. The maps show custom markers and info windows with property details.

## Application Structure

### Pages
- **Home:** Landing page with featured properties and trending listings
- **Properties:** Complete property catalog with grid layout
- **Property Detail:** Individual property view with full information and map
- **Contact:** Viewing request form
- **About:** Information about the project
- **Login:** User authentication
- **Register:** New user registration
- **Create Property:** Form to add new properties

### Services
- **PropertyService:** Handles all property-related database operations
- **AuthService:** Manages user authentication with Firebase
- **ViewingService:** Handles viewing request submissions

### Guards
- **AuthGuard:** Protects routes that require authentication

## Architecture

### Standalone Components
This project uses Angular 15+ standalone component architecture instead of the traditional NgModule system. This means:
- No app.module.ts file
- Each component declares its own imports
- Configuration is handled in app.config.ts
- Routes are defined in app.routes.ts

### Firebase Configuration
The application uses Firebase for backend services:
- **Authentication:** User login and registration
- **Firestore:** Two main collections (properties and viewings)

## Installation Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm (version 8 or higher)
- Ionic CLI (version 7 or higher)

### Setup Steps

1. Clone the repository
```bash
git clone <repository-url>
cd real-estate-app
```

2. Install dependencies
```bash
npm install
```

3. Configure Google Maps API (Optional)
   - Obtain an API key from Google Cloud Console
   - Add the script to src/index.html:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

4. Start the development server
```bash
ionic serve
```

5. Open browser to http://localhost:8100

### Firebase Configuration
Firebase credentials are already configured in src/app/app.config.ts for assessment purposes.

## Project Structure
```
src/
├── app/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── models/
│   │   ├── property.model.ts
│   │   └── viewing.model.ts
│   ├── pages/
│   │   ├── home/
│   │   ├── properties/
│   │   ├── property-detail/
│   │   ├── contact/
│   │   ├── about/
│   │   ├── login/
│   │   ├── register/
│   │   └── create-property/
│   ├── services/
│   │   ├── property.service.ts
│   │   ├── auth.service.ts
│   │   └── viewing.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── environments/
├── theme/
│   └── global.scss
├── index.html
├── main.ts
└── polyfills.ts
```

## Firestore Database Structure

### Properties Collection
```typescript
{
  id: string
  Title: string
  Location: string
  Price: number
  Bedrooms: number
  Bathrooms: number
  Area: number
  Description: string
  Images: string[]
  Featured: boolean
  Latitude: number
  Longitude: number
}
```

### Viewings Collection
```typescript
{
  id: string
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  propertyInterest: string
  additionalNotes: string
  timestamp: Date
}
```

## Responsive Design

The application follows a mobile-first approach with three main breakpoints:
- **Mobile:** Below 768px (single column layout)
- **Tablet:** 768px to 1024px (two column layout)
- **Desktop:** Above 1024px (three column layout)

## Design System

### Colors
- Primary: Blue (#3b82f6)
- Background: Light gray-blue (#f8fafc)
- Text: Dark blue-gray (#0f172a)
- Borders: Light blue (#e0e7ff)

### Typography
- Font: System fonts
- Text alignment: Justified throughout
- Headings: Bold weights
- Body text: Regular weights

### Components
- Border radius: 8px to 16px
- Border width: 2px
- Box shadows: Minimal and subtle
- Transitions: 0.2s to 0.25s ease


## Testing

### Run Tests
```bash
npm run test
```

### Lint Code
```bash
npm run lint
```

## Building for Production

### Web Build
```bash
ionic build --prod
```

### Android Build
```bash
ionic cap add android
ionic cap sync android
ionic cap open android
```

### iOS Build
```bash
ionic cap add ios
ionic cap sync ios
ionic cap open ios
```

## Known Issues
None at this time.

## Future Enhancements
Potential improvements for future versions:
- Property search and filtering functionality
- User favorites and saved properties
- Property comparison feature
- User profile management
- Property image upload from device
- Push notifications for new properties

## References
- Ionic Documentation: https://ionicframework.com/docs
- Angular Documentation: https://angular.io/docs
- Firebase Documentation: https://firebase.google.com/docs
- Google Maps JavaScript API: https://developers.google.com/maps/documentation/javascript

