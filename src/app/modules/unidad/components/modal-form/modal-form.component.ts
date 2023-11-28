import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { UnidadService } from '../../services/unidad.service';
import { Unidad } from '@core/models/Unidad';
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
  private unidadService = inject(UnidadService);
  

  ngOnInit() {
    this.unidadService.eventFormComponent.emit(this);
    this.unidadService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  unidad!: Unidad; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formUnidad: FormGroup = this.formBuilder.group({
    id: [],
    descripcion: [ , Validators.required,],
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nueva Unidad";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Unidad";
    this.unidadService.getById(id).subscribe({
      next: (res) => {
        this.unidad = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveUnidad() {
    this.isLoading = true;
    if (this.formUnidad.valid) {
      if(this.unidad.id){
        this.submitUpdate(this.unidad.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formUnidad.reset();
    this.unidad = new Unidad;
    
  };

  submitCreate() {
    const data: Unidad = {
      ...this.formUnidad.value,
    };
    this.unidadService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `La unidad ${res.descripcion} ha sido creada.`, 3000);
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
    const data: Unidad = {
      ...this.formUnidad.value,
    };
    this.unidadService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedUnidad.set( res );
          this.helpersService.messageNotification("success", "Correcto", `La unidad  ${res.descripcion} ha sido actualizada.`, 3000);
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
