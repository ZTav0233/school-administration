import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';


export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  if (isLoggedIn) {
    return true;
  }
  router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  return false;

}
