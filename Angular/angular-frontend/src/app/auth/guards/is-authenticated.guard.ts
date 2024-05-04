import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  console.log("route - state", route, state);

  const authService = inject(AuthService);
  console.log(authService.authStatus());

  const router = inject(Router);
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  router.navigateByUrl('/auth/login');
  return false;
};
