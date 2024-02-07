import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>('./assets/data/adminData.json').pipe(
      map((users) => {
        const user = users.find(
          (u: any) => u.username === username && u.password === password
        );
        if (user) {
          const token = this.generateRandomToken(username, password);
          return { success: true, token, user };
        } else {
          return { success: false, message: 'Invalid username or password' };
        }
      })
    );
  }
  private generateRandomToken(username: string, password: string): string {
    const tokenString = username + password;
    const hashedToken = btoa(tokenString);
    return hashedToken;
  }
  isLoggedIn() {
    return localStorage.getItem('token');
  }
}
