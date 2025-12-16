import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Import routes
import { routes } from './app.routes';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8h_2wkKIXKm7T6YfY2f3Yj9IQKN8g5M",
  authDomain: "eal-estate-app-20002814.firebaseapp.com",
  projectId: "eal-estate-app-20002814",
  storageBucket: "eal-estate-app-20002814.firebasestorage.app",
  messagingSenderId: "434361548103",
  appId: "1:434361548103:web:eb0b9bc05ebfd15b04f1bf"
};

/**
 * Application providers configuration
 * All app-level providers and configurations
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Zone change detection optimization
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Router configuration with routes
    provideRouter(routes),
    
    // Ionic Angular configuration
    provideIonicAngular(),
    
    // Firebase App initialization
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    
    // Firebase Auth
    provideAuth(() => getAuth()),
    
    // Firebase Firestore
    provideFirestore(() => getFirestore()),
  ],
};