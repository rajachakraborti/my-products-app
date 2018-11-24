import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HTTPTOKEN} from './../core/core.constants';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}


  signinUser(email: string, password: string) {
    setTimeout(() => {
      this.token = HTTPTOKEN;
      this.router.navigate(['/products']);
    }, 2000);
  }

  logout() {
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken(): string {
    return this.token;
  }
  
  isAuthenticated() : boolean{
    return this.token != null;
  }
}
