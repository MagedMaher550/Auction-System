import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
