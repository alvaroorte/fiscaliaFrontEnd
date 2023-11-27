import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Person } from '@core/models/Person';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Person[]>(this.serverUrl+'persona')
  }
  
  public getById(id: number) {
    return this.http.get<Person>(this.serverUrl + 'persona/' + id)
  }
  
  public create(persona: Person) {
    return this.http.post<Person>(this.serverUrl + 'persona', persona)
  }
  
  public update(id: number, persona: Person) {
    return this.http.put<Person>(this.serverUrl + 'persona/' + id, persona)
  }

  public delete(id: number) {
    return this.http.delete<string>(this.serverUrl + 'persona/' + id)
  }

}
