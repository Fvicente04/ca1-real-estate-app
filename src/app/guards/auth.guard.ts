import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs/operators';

/**
 * Authentication guard for protecting routes
 * Redirects unauthenticated users to the login page
 * @returns Observable that resolves to true if authenticated, or redirects to login
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  /* Check authentication state and redirect if needed */
  return authService.user$.pipe(
    take(1), // Take only the first emission
    map(user => {
      if (user) {
        return true; // User is authenticated, allow access
      }
      return router.createUrlTree(['/login']); // Redirect to login
    })
  );
};