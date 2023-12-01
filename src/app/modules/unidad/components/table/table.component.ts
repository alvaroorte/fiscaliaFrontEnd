import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Unidad } from '@core/models/Unidad';
import { UnidadService } from '../../services/unidad.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  @Output() rowSelected = new EventEmitter<Unidad>();

  private unidadService = inject(UnidadService);
  private helpersService = inject(HelpersService);

  unidades = signal<Unidad[]>([]);
  selectedUnidad = signal<Unidad>(new Unidad);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.unidadService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.unidadService.getAll().subscribe({
      next: (res) => { 
        this.unidades.set(res);
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
    this.selectedUnidad.set(event.data);
    this.rowSelected.emit(this.selectedUnidad());
  }

  onRowUnselect() {
    this.selectedUnidad.set(new Unidad);
    this.rowSelected.emit(this.selectedUnidad());
  }

}
