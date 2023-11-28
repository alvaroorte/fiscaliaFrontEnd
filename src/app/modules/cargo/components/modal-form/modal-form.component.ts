import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '@core/models/Cargo';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styles: [
  ]
})
export class ModalFormComponent {

  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private cargoService = inject(CargoService);

  ngOnInit() {
    this.cargoService.eventFormComponent.emit(this);
    this.cargoService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  cargo!: Cargo; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formCargo: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [, Validators.required,],
    item: [, [Validators.required]]
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Cargo";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Cargo";
    this.cargoService.getById(id).subscribe({
      next: (res) => {
        this.cargo = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveCargo() {
    this.isLoading = true;
    if (this.formCargo.valid) {
      if(this.cargo.id){
        this.submitUpdate(this.cargo.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formCargo.reset();
    this.cargo = new Cargo;
    
  };

  submitCreate() {
    const data: Cargo = {
      ...this.formCargo.value,
    };
    this.cargoService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El cargo ${res.descripcion} ha sido creado.`, 3000);
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
    const data: Cargo = {
      ...this.formCargo.value,
    };
    this.cargoService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedCargo.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El cargo  ${res.descripcion} ha sido actualizado.`, 3000);
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
