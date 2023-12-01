import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { PersonService } from '@person/services/person.service';
import { CargoService } from 'src/app/modules/cargo/services/cargo.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '@core/models/Funcionario';
import { TableComponent } from '../table/table.component';
import { UnidadService } from 'src/app/modules/unidad/services/unidad.service';
import { Person } from '@core/models/Person';
import { Cargo } from '@core/models/Cargo';
import { Unidad } from '@core/models/Unidad';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {

  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private unidadService = inject(UnidadService);
  private personService = inject(PersonService);
  private cargoService = inject(CargoService);
  private funcionarioService = inject(FuncionarioService);

  personas = signal<Person[]>([]);
  cargos = signal<Cargo[]>([]);
  unidades = signal<Unidad[]>([]);
  

  ngOnInit() {
    this.funcionarioService.eventFormComponent.emit(this);
    this.funcionarioService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.getAllPersonas();
    this.getAllCargos();
    this.getAllUnidades();

  };

  funcionario!: Funcionario; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formFuncionario: FormGroup = this.formBuilder.group({
    id: [],
    idPersona: [ , [Validators.required]],
    idCargo: [ , [Validators.required]],
    idUnidad: [ , [Validators.required]],
  });

  getAllPersonas() {
    this.personService.getAll().subscribe({
      next: (res) => { 
        this.personas.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }
  
  getAllCargos() {
    this.cargoService.getAll().subscribe({
      next: (res) => { 
        this.cargos.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }
  
  getAllUnidades() {
    this.unidadService.getAll().subscribe({
      next: (res) => { 
        this.unidades.set(res);
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  }

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nueva Funcionario";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Funcionario";
    this.funcionarioService.getById(id).subscribe({
      next: (res) => {
        this.funcionario = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveFuncionario() {
    this.isLoading = true;
    if (this.formFuncionario.valid) {
      if(this.funcionario.id){
        this.submitUpdate(this.funcionario.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formFuncionario.reset();
    this.funcionario = new Funcionario;
    
  };

  submitCreate() {
    const data: Funcionario = {
      ...this.formFuncionario.value,
    };
    this.funcionarioService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El funcionario ${res.id} ha sido creado.`, 3000);
        this.hideModal();
        this.reset();
      },
      error: (err) => { 
        this.isLoading = false;
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };
  
  submitUpdate(idParameter : number) {
    const data: Funcionario = {
      ...this.formFuncionario.value,
    };
    this.funcionarioService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedFuncionario.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El funcionario  ${res.id} ha sido actualizado.`, 3000);
          this.hideModal();
          this.reset();
        },
        error: (err) => { 
          console.log(err);
          this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
          this.isLoading = false;
        }
    })
  }

}
