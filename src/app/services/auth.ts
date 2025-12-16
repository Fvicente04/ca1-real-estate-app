import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

/**
 * Service responsible for user authentication with Firebase
 * Manages registration, login, logout and authenticated user state
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  
  /** Observable that emits the current authenticated user state */
  user$: Observable<any>;

  constructor() {
    // Initializes the observable that monitors authentication state changes
    this.user$ = user(this.auth);
  }

  /**
   * Registers a new user in Firebase
   * @param email - User's email address
   * @param password - User's password
   * @returns Created user credential
   * @throws Firebase error on failure (e.g., email already in use, weak password)
   */
  async register(email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      return credential;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates an existing user
   * @param email - User's email address
   * @param password - User's password
   * @returns Authenticated user credential
   * @throws Firebase error on invalid credentials
   */
  async login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      return credential;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logs out the current user from the application
   * @throws Firebase error on logout failure
   */
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns the currently authenticated user
   * @returns Firebase User object or null if no user is authenticated
   */
  getCurrentUser() {
    return this.auth.currentUser;
  }

  /**
   * Checks if there is an authenticated user
   * @returns true if user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }
}