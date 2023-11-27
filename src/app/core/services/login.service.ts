import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { LoginRequest, LoginResponse } from '@core/models/Login';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventChangeUserComponent: EventEmitter<any> = new EventEmitter();
  
  private http = inject(HttpClient);
  private localStorageService =  inject(LocalStorageService);

  private serverUrl: string = environment.server_security_url;

  public login( user: LoginRequest ) {
    return this.http.post<LoginResponse>(this.serverUrl+'login', user)
  }

}
