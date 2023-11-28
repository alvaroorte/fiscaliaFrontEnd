import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Unidad } from '@core/models/Unidad';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Unidad[]>(this.serverUrl+'unidad')
  }
  
  public getById(id: number) {
    return this.http.get<Unidad>(this.serverUrl + 'unidad/' + id)
  }
  
  public create(unidad: Unidad) {
    return this.http.post<Unidad>(this.serverUrl + 'unidad', unidad)
  }
  
  public update(id: number, unidad: Unidad) {
    return this.http.put<Unidad>(this.serverUrl + 'unidad/' + id, unidad)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'unidad/' + id)
  }

}
