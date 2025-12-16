/*Property model and Represents a real estate property listing*/

export interface Property {
  
  id?: string;
  
  Title: string;
  
  Price: number;
  
  Location: string;

  Bedrooms: number;
  
  Bathrooms: number;
  
  Area: number;
  
  Description: string;
  
  Images: string[];

  Featured?: boolean;
}