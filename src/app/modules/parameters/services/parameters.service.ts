import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Params } from '@angular/router';
import { DataCommon } from 'src/app/core/dto/tableDouble.interface';
import { Parameter } from 'src/app/core/models/Parameter';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;
  params: Params = {};

  public getAll() {
    return this.http.get<Parameter[]>(this.serverUrl+'parameter')
  }
  
  public getById(id: number) {
    return this.http.get<Parameter>(this.serverUrl + 'parameter/' + id)
  }
  
  public create(parameter: Parameter) {
    return this.http.post<Parameter>(this.serverUrl + 'parameter', parameter)
  }
  
  public update(id: number, parameter: Parameter) {
    return this.http.put<Parameter>(this.serverUrl + 'parameter/' + id, parameter)
  }

  public delete(id: number) {
    return this.http.delete<string>(this.serverUrl + 'parameter/' + id)
  }
  
  public search(folder: string | undefined) {
    let params: any = {};
    ( folder )? params['folder'] = folder : "";
    return this.http.get<Parameter[]>(this.serverUrl+'parameter/parameterSearch', { params })
  }
  
  public getListFolder() {
    return this.http.get<DataCommon[]>(this.serverUrl+'parameter/proyection')
  }

}