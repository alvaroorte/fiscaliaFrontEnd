import { ChangeDetectionStrategy, Component, inject, signal, Output, EventEmitter } from '@angular/core';
import { Table } from 'primeng/table';
import { Parameter } from 'src/app/core/models/Parameter';
import { ParametersService } from '../../services/parameters.service';
import { FormComponent } from '../form/form.component';
import { HelpersService } from 'src/app/core/services/helpers.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Output() rowSelected = new EventEmitter<Parameter>();

  private parametersService = inject(ParametersService);
  private helpersService = inject(HelpersService);

  parameters = signal<Parameter[]>([]);
  selectedParameter = signal<Parameter>( new Parameter );
  firstPage = 0;
  optionsPage = signal([5, 10, 20]);
  loading = signal(false);

  formComponent!: FormComponent;

  constructor() {
    this.parametersService.eventFormComponent.subscribe((formComponent) => {
      this.formComponent = formComponent;
    });

  }

  ngOnInit() {
    this.parametersService.eventTableComponent.emit(this);
    this.getAll();
  }

  getAll(): void {
    this.loading.set(true);
    this.parametersService.search(undefined).subscribe({
      next: (res) => { 
        this.parameters.set(res);
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
    this.selectedParameter.set(event.data);
    this.rowSelected.emit(this.selectedParameter());
  }

  onRowUnselect() {
    this.selectedParameter.set(new Parameter);
    this.rowSelected.emit(undefined);
  }   
}



