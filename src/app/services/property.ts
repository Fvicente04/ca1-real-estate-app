import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

/**
 * Service for managing property listings in Firestore
 * Handles CRUD operations and queries for real estate properties
 */
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  /* Firestore collection name */
  private collectionName = 'properties';

  constructor(private firestore: Firestore) {}

  /**
   * Get all properties from Firestore
   * @returns Observable of property array
   */
  getProperties(): Observable<Property[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<Property[]>;
  }

  /**
   * Get featured properties only
   * @returns Observable of featured properties array
   */
  getFeaturedProperties(): Observable<Property[]> {
    const ref = collection(this.firestore, this.collectionName);
    const q = query(ref, where('Featured', '==', true));
    return collectionData(q, { idField: 'id' }) as Observable<Property[]>;
  }

  /**
   * Get a single property by ID
   * @param id - Property document ID
   * @returns Observable of property object
   */
  getPropertyById(id: string): Observable<Property> {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Property>;
  }

  /**
   * Create a new property listing
   * @param property - Property object to create
   * @returns Promise with the document reference
   */
  async createProperty(property: Property): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, property);
  }

  /**
   * Update an existing property
   * @param id - Property document ID
   * @param property - Updated property data
   * @returns Promise that resolves when update is complete
   */
  async updateProperty(id: string, property: Partial<Property>): Promise<void> {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(ref, { ...property });
  }

  /**
   * Delete a property listing
   * @param id - Property document ID
   * @returns Promise that resolves when deletion is complete
   */
  async deleteProperty(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(ref);
  }
}