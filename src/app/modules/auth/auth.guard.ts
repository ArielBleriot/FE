
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
export const authGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  //const store = inject(Store);
  const jwtHelper = new JwtHelperService();
  const authorize = localStorage.getItem('AuthToken');
  const isAuthenticated = authorize && !jwtHelper.isTokenExpired(authorize);
  if (isAuthenticated) {
    return true;
  }
 localStorage.removeItem('AuthToken');
  return createUrlTreeFromSnapshot(next, ["/", "accounts", "login"]);
};
