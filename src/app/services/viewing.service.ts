import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Viewing } from '../models/viewing.model';

/**
 * Service responsible for managing viewings in Firestore
 * Handles CRUD operations for viewing appointments
 */
@Injectable({
  providedIn: 'root'
})
export class ViewingService {
  /** Name of the Firestore collection for viewings */
  private collectionName = 'viewings';

  constructor(private firestore: Firestore) {}

  /**
   * Creates a new viewing appointment in Firestore
   * Automatically adds a createdAt timestamp to the document
   * @param viewing - Viewing object containing appointment details
   * @returns Promise that resolves with the document reference
   * @throws Firestore error on creation failure
   */
  createViewing(viewing: Viewing): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, {
      ...viewing,
      createdAt: new Date()
    });
  }
}