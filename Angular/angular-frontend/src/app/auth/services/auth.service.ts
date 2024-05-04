import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environments';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL: string = environment.baseUrl;
  private httpClient = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  /**
   * 
   * @param user 
   * @param token 
   * @returns 
   */
  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseURL}/auth/login`;
    const body = { email, password };

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err.error.message))
      );
  }

  /**
   * 
   * @returns 
   */
  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseURL}/token/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );


  }

  /**
   * 
   */
  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

  }

  // Metodo para insertar un usuario
  register(name: string, email: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseURL}/auth/register`;
    const body = { name, email, password };

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        catchError(err => throwError(() => err.error.message))
      );
  }

  // Método para buscar un usuario por ID
  getUserById(userId: string): Observable<User> {
    const url = `${this.baseURL}/auth/${userId}`;
    return this.httpClient.get<User>(url);
  }

  // Método para actualizar un usuario
  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.baseURL}/auth/${userId}`;
    return this.httpClient.patch(url, userData).pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

  // Método para eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    const url = `${this.baseURL}/auth/${userId}`;
    return this.httpClient.delete(url).pipe(
      catchError(err => throwError(() => err.error.message))
    );
  }

}
