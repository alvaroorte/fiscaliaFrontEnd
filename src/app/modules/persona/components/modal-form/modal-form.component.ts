import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '@core/models/Person';
import { HelpersService } from '@core/services/helpers.service';
import { PersonService } from '@person/services/person.service';
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
  private personService = inject(PersonService);


  ngOnInit() {
    this.personService.eventFormComponent.emit(this);
    this.personService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });
  };

  person!: Person; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formPerson: FormGroup = this.formBuilder.group({
    id: [],
    nombre: [, Validators.required,],
    apellidoPat: [, [Validators.required]],
    apellidoMat: [, Validators.required,],
    ci: [, Validators.required,],
    celular: [, Validators.required,]
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
    this.personService.getById(id).subscribe({
      next: (res) => {
        this.person = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  savePerson() {
    this.isLoading = true;
    if (this.formPerson.valid) {
      if(this.person.id){
        this.submitUpdate(this.person.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formPerson.reset();
    this.person = new Person;
    
  };

  submitCreate() {
    const data: Person = {
      ...this.formPerson.value,
    };
    this.personService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `La persona ${res.nombre} ha sido creada.`, 3000);
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
    const data: Person = {
      ...this.formPerson.value,
    };
    this.personService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedPerson.set( res );
          this.helpersService.messageNotification("success", "Correcto", `La persona ${res.nombre} ha sido actualizada.`, 3000);
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
