import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Funcionario } from '@core/models/Funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import { HelpersService } from '@core/services/helpers.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  @Output() rowSelected = new EventEmitter<Funcionario>();

  private funcionarioService = inject(FuncionarioService);
  private helpersService = inject(HelpersService);

  funcionarios = signal<Funcionario[]>([]);
  selectedFuncionario = signal<Funcionario>(new Funcionario);
  firstPage = 0;
  rows = 5;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  ngOnInit() {
    this.funcionarioService.eventTableComponent.emit(this);
    this.getAll();
    this.helpersService.reloadGeneric.subscribe( () => {
      this.reload();
    })
  }

  getAll(): void {
    this.loading.set(true);
    this.funcionarioService.getAll().subscribe({
      next: (res) => { 
        this.funcionarios.set(res);
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
    this.selectedFuncionario.set(event.data);
    this.rowSelected.emit(this.selectedFuncionario());
  }

  onRowUnselect() {
    this.selectedFuncionario.set(new Funcionario);
    this.rowSelected.emit(this.selectedFuncionario());
  }

}
