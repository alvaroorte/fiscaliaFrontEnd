import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from 'src/app/core/services/helpers.service';
import { Parameter } from 'src/app/core/models/Parameter';
import { TableComponent } from '../table/table.component';
import { ParametersService } from 'src/app/modules/parameters/services/parameters.service';
import { iconsPrime as IconsPrime } from 'src/app/shared/icons/icons-pime';
import { Icon } from 'src/app/core/models/Icon';
import { DataCommon } from 'src/app/core/dto/tableDouble.interface';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent {

  private formBuilder = inject(FormBuilder);
  private helpersService = inject(HelpersService);
  private parametersService = inject(ParametersService);

  iconsPrime!: Icon[];
  selectedIcon: Icon | null = null;
  folders!: DataCommon[];

  ngOnInit() {
    this.parametersService.eventFormComponent.emit(this);
    this.parametersService.eventTableComponent.subscribe((tableComponent) => {
      this.tableComponent = tableComponent;
    });

    this.iconsPrime = IconsPrime;
    this.getFolders();

  };

  parameters!: Parameter[];
  parameter!: Parameter; 
  openModal: boolean = false;
  tittleForm: string = "";
  tableComponent!: TableComponent;
  isLoading = false;

  public formParameter: FormGroup = this.formBuilder.group({
    id: [],
    folder: [, Validators.required,],
    ranking: [, [Validators.required, Validators.minLength(5)]],
    value: [, Validators.required,],
    icon: [, Validators.required,],
    color: [, Validators.required,],
    magnitude: [, Validators.required,],
    kind: [, Validators.required,],
  });

  getFolders() {
    this.parametersService.getListFolder().subscribe({
      next: (res) => { 
        this.folders = res;
      },
      error: (err) => {
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    });
  }

  hideModal() {
    this.openModal = false;
    this.isLoading = false;
  };

  openCreate(){
    this.reset();
    this.tittleForm = "Nuevo Parámetro";
    this.openModal = true;
  };

  openEdit(id: number ){
    this.reset();
    this.tittleForm="Editar Parámetro";
    this.parametersService.getById(id).subscribe({
      next: (res) => {
        this.parameter = res;
        this.openModal=true;
      },
      error: (err) => { 
        console.log(err);
        this.helpersService.messageNotification("error", err.error.error, err.error.message, 3000);
      }
    })
  };

  saveParameter() {
    this.isLoading = true;
    if (this.formParameter.valid) {
      if(this.parameter.id){
        this.submitUpdate(this.parameter.id);
      }else{
        this.submitCreate();
      }
    }
  };
  
  reset(): void {
    this.formParameter.reset();
    this.parameter = new Parameter;
    
  };

  submitCreate() {
    const data: Parameter = {
      ...this.formParameter.value,
    };
    this.parametersService.create(data).subscribe({
      next: (res) => { 
        this.tableComponent.reload();
        this.helpersService.messageNotification("success", "Correcto", `El parámetro ${res.folder} ha sido creado.`, 3000);
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
    const data: Parameter = {
      ...this.formParameter.value,
    };
    this.parametersService.update(idParameter, data).subscribe({
        next: (res) => { 
          this.tableComponent.reload();
          this.tableComponent.selectedParameter.set( res );
          this.helpersService.messageNotification("success", "Correcto", `El parámetro ${res.folder} ha sido actualizado.`, 3000);
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
