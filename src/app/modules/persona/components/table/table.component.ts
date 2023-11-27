import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Person } from '@core/models/Person';
import { PersonService } from '../../services/person.service';
import { HelpersService } from '@core/services/helpers.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  @Output() rowSelected = new EventEmitter<Person>();

  // private enterpriseComponent = inject(EnterprisesComponent); 
  private personService = inject(PersonService);
  private helpersService = inject(HelpersService);

  people = signal<Person[]>([]);
  selectedPerson = signal<Person>(new Person);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  formComponent!: ModalFormComponent;

  ngOnInit() {
    this.personService.eventTableComponent.emit(this);
    this.getAll();
  }

  getAll(): void {
    this.loading.set(true);
    this.personService.getAll().subscribe({
      next: (res) => { 
        this.people.set(res);
        this.loading.set(false);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
  }

  reload (): void {    
    this.getAll();
    this.firstPage = 0;
  } 
  
  onRowSelect(event: any) {
    this.selectedPerson.set(event.data);
    this.rowSelected.emit(this.selectedPerson());
  }

  onRowUnselect() {
    this.selectedPerson.set(new Person);
    this.rowSelected.emit(this.selectedPerson());
  }   

}
