import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, alertCircleOutline } from 'ionicons/icons';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Register icons for password toggle and error messages
    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline,
      'alert-circle-outline': alertCircleOutline,
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onRegister() {
    this.errorMessage = '';

    // Check if all fields are filled
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Validate password length
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords don't match.";
      return;
    }

    this.loading = true;

    try {
      // Create new user account
      await this.authService.register(this.email, this.password);

      // Log out immediately so user has to login explicitly
      try {
        await this.authService.logout();
      } catch {
        // Ignore logout errors
      }

      // Redirect to login page
      this.router.navigate(['/login']);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      this.errorMessage = this.getErrorMessage(error?.code) || 'Error creating account.';
      
    } finally {
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Convert Firebase error codes to user-friendly messages
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/operation-not-allowed':
        return 'Registration is currently disabled. Please try again later.';
      default:
        return 'An error occurred during registration. Please try again.';
    }
  }
}