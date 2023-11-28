import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Cargo } from '@core/models/Cargo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Cargo[]>(this.serverUrl+'cargo')
  }
  
  public getById(id: number) {
    return this.http.get<Cargo>(this.serverUrl + 'cargo/' + id)
  }
  
  public create(cargo: Cargo) {
    return this.http.post<Cargo>(this.serverUrl + 'cargo', cargo)
  }
  
  public update(id: number, cargo: Cargo) {
    return this.http.put<Cargo>(this.serverUrl + 'cargo/' + id, cargo)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'cargo/' + id)
  }

}
