import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { User } from '@core/models/User';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<User[]>(this.serverUrl+'usuario')
  }
  
  public getById(id: number) {
    return this.http.get<User>(this.serverUrl + 'usuario/' + id)
  }
  
  public create(usuario: User) {
    return this.http.post<User>(this.serverUrl + 'usuario', usuario)
  }
  
  public update(id: number, usuario: User) {
    return this.http.put<User>(this.serverUrl + 'usuario/' + id, usuario)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'usuario/' + id)
  }

}
