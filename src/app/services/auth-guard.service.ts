import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take, takeWhile } from 'rxjs';
import { AuthService } from './auth.service';
import { TournamentDataService } from './tournament-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tDataService: TournamentDataService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.userSubject.pipe(
      // takeWhile((user) => user._id !== ''),
      map((user) => {
        console.log(user);
        return !!user._id;
      })
    )
  }
}
