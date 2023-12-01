import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Cargo } from '@core/models/Cargo';
import { CargoService } from '../../services/cargo.service';
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

  @Output() rowSelected = new EventEmitter<Cargo>();

  private CargoService = inject(CargoService);
  private helpersService = inject(HelpersService);

  cargos = signal<Cargo[]>([]);
  selectedCargo = signal<Cargo>(new Cargo);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  formComponent!: ModalFormComponent;

  ngOnInit() {
    this.CargoService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.CargoService.getAll().subscribe({
      next: (res) => { 
        this.cargos.set(res);
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
    this.selectedCargo.set(event.data);
    this.rowSelected.emit(this.selectedCargo());
  }

  onRowUnselect() {
    this.selectedCargo.set(new Cargo);
    this.rowSelected.emit(this.selectedCargo());
  } 

}
