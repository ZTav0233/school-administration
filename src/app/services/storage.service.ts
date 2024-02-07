import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Function to save array data in session storage
  saveArrayData(key: string, data: any[]): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Function to retrieve array data from session storage
  getArrayData(key: string): any[] | null {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  // Function to clear array data from session storage
  clearArrayData(key: string): void {
    sessionStorage.removeItem(key);
  }
}
