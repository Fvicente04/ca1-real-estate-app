import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'properties',
    loadComponent: () => import('./pages/properties/properties.page').then((m) => m.PropertiesPage),
  },
  {
    path: 'property-detail/:id',
    loadComponent: () => import('./pages/property-detail/property-detail.page').then((m) => m.PropertyDetailPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'create-property',
    loadComponent: () => import('./pages/create-property/create-property.page').then((m) => m.CreatePropertyPage),
  },
  
];