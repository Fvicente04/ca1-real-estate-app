export interface Viewing {
  id?: string;
  name: string;
  email: string;
  date: string;    
  time: string;    
  property: string;
  notes: string;
  createdAt?: any;
}

/* Viewing appointment model and Represents a property viewing scheduled by a potential buyer */

export interface Viewing {
  /* Firestore document ID (auto-generated) */
  id?: string;
  
  /* User's full name */
  name: string;
  
  /* User's email address */
  email: string;
  
  /* Viewing date in format yyyy-MM-dd */
  date: string;
  
  /* Viewing time in format hh:mm */
  time: string;
  
  /* Property name or identifier */
  property: string;
  
  /* Additional notes or comments from the user */
  notes: string;
  
  /* Timestamp when the viewing was created (auto-generated) */
  createdAt?: any;
}