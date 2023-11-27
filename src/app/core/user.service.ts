import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter, inject  } from '@angular/core';
import { Params } from '@angular/router';
import { Ticket, TicketSend } from 'src/app/core/models/Ticket';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() eventFormComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventTableComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventModalDeleteComponent: EventEmitter<any> = new EventEmitter();
  @Output() eventToolbarComponent: EventEmitter<any> = new EventEmitter();

  private http = inject(HttpClient);

  private serverUrl: string = environment.server_url;
  params: Params = {};
  token = "eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIlJPTEVfQURNSU5cIn1dIiwiaXNBZG1pbiI6dHJ1ZSwidXNlcklkIjoxLCJ1c2VyRW1haWwiOiJhbnRvbmlvLnNhbGF6YXJAZ21haWwuY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2OTk2MzM3NzEsImV4cCI6MTY5OTcyMDE3MX0.n0ID--C5Uj4jxS9OAlhc34mPabIxundJPnKoqeMOuQY";
  public search() {
    return this.http.get<Ticket[]>(this.serverUrl+'search',{ headers: {Authorization: "Bearer " + this.token}});
  }

}
