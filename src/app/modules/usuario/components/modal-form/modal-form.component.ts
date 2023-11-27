import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '@core/models/User';
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
  private userService = inject(UsuarioService);


  ngOnInit() {
    this.userService.eventFormComponent.emit(this);
    this.userService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  user!: User; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formUser: FormGroup = this.formBuilder.group({
    id: [],
    usuario: [, Validators.required,],
    idFuncionario: {
      id: [, Validators.required,],
    }
  });

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nueva Persona";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Persona";
    this.userService.getById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveUser() {
    this.isLoading = true;
    if (this.formUser.valid) {
      if(this.user.id){
        this.submitUpdate(this.user.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formUser.reset();
    this.user = new User;
    
  };

  submitCreate() {
    const data: User = {
      ...this.formUser.value,
    };
    this.userService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El usuario ${res.usuario} ha sido creada.`, 3000);
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
    const data: User = {
      ...this.formUser.value,
    };
    this.userService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedPerson.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El usuario ${res.usuario} ha sido actualizada.`, 3000);
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
