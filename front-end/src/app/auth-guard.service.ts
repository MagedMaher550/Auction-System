import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(): boolean {
    const userId = this.localStorageService.getItem('userId');
    if (userId) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
