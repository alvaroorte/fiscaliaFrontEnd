import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Funcionario } from '@core/models/Funcionario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;

  public getAll() {
    return this.http.get<Funcionario[]>(this.serverUrl+'funcionario')
  }
  
  public getById(id: number) {
    return this.http.get<Funcionario>(this.serverUrl + 'funcionario/' + id)
  }
  
  public create(funcionario: Funcionario) {
    return this.http.post<Funcionario>(this.serverUrl + 'funcionario', funcionario)
  }
  
  public update(id: number, funcionario: Funcionario) {
    return this.http.put<Funcionario>(this.serverUrl + 'funcionario/' + id, funcionario)
  }

  public delete(id: number) {
    return this.http.delete(this.serverUrl + 'funcionario/' + id)
  }

}
