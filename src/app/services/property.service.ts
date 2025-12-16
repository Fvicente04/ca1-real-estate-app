/**
 * PROPERTY SERVICE
 * Service for managing property data in Firestore
 * 
 * Features:
 * - Fetch all properties
 * - Fetch single property by ID
 * - Create new property
 * - Real-time updates with Observable
 */

import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData,
  addDoc,
  query,
  orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  /**
   * Firestore collection name for properties
   */
  private collectionName = 'properties';

  /**
   * Constructor
   * @param firestore - Firebase Firestore instance
   */
  constructor(private firestore: Firestore) {}

  /**
   * Get all properties from Firestore
   * Returns Observable for real-time updates
   * 
   * @returns Observable<Property[]> - Stream of all properties
   */
  getProperties(): Observable<Property[]> {
    const propertiesCollection = collection(this.firestore, this.collectionName);
    const propertiesQuery = query(propertiesCollection, orderBy('Price', 'desc'));
    return collectionData(propertiesQuery, { idField: 'id' }) as Observable<Property[]>;
  }

  /**
   * Get a single property by ID
   * Returns Observable for real-time updates
   * 
   * @param id - Property document ID
   * @returns Observable<Property> - Stream of single property
   */
  getPropertyById(id: string): Observable<Property> {
    const propertyDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(propertyDoc, { idField: 'id' }) as Observable<Property>;
  }

  /**
   * Create a new property in Firestore
   * Adds timestamp for when property was created
   * 
   * @param property - Property object to create
   * @returns Promise<any> - Promise that resolves when property is created
   */
  createProperty(property: Property): Promise<any> {
    const propertiesCollection = collection(this.firestore, this.collectionName);
    
    // Add created timestamp
    const propertyWithTimestamp = {
      ...property,
      createdAt: new Date(),
    };

    return addDoc(propertiesCollection, propertyWithTimestamp);
  }

  /**
   * Get featured properties only
   * Useful for homepage display
   * 
   * @returns Observable<Property[]> - Stream of featured properties
   */
  getFeaturedProperties(): Observable<Property[]> {
    const propertiesCollection = collection(this.firestore, this.collectionName);
    return collectionData(propertiesCollection, { idField: 'id' }) as Observable<Property[]>;
  }
}