import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _router = inject(Router);
  private readonly _tokenName = 'authToken';
  userName = signal('userName');

  constructor() {
    this.setUserName();
   }

   /**
   * Valite auth token.
   * @returns True when token is valid.
   */
  isAuthenticated() {
    const token = this.getAuthToken();
    return !!token;
  }

  /**
   * Retrive auth token from local storage.
   */
  getAuthToken(): string | null {
    return localStorage.getItem(this._tokenName);
  }

  /**
   * Log out user and clear any saved token.
   */
  logout() {
    localStorage.removeItem(this._tokenName);
    this._router.navigate(['/login']);

    this.setUserName();
  }

  /**
   * Request token from the authorization endpoint and save it to local storage only if it's valid.
   * @param userId - The user ID or client ID for authentication.
   * @param userSecret - The user secret or client secret for authentication.
   */
  handleTokenRequest(userId: string, userSecret: string) {
    // TODO: request token from auth server! #US4832

    // Store the access token for a live time of local storage (infinite).
    localStorage.setItem(this._tokenName, userId);

    this.setUserName();
    this._router.navigate(['/']);
  }

  /**
   * Set userName variable for visualization purposes.
   */
  private setUserName() {
    this.userName.set(this.getAuthToken()?.replace(/[,.+-]+/g, ' '));
  }
}
