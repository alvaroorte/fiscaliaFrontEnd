import { Component, Input, inject } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { PersonService } from 'src/app/modules/persona/services/person.service';
import { Person } from '@core/models/Person';
import { UsuarioService } from 'src/app/modules/usuario/services/usuario.service';
import { User } from '@core/models/User';
import { Cargo } from '@core/models/Cargo';
import { CargoService } from 'src/app/modules/cargo/services/cargo.service';
import { UnidadService } from 'src/app/modules/unidad/services/unidad.service';
import { Unidad } from '@core/models/Unidad';
import { Funcionario } from '@core/models/Funcionario';
import { FuncionarioService } from 'src/app/modules/funcionario/services/funcionario.service';

@Component({
  selector: 'app-toolbar-common',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PrimeComponentsModule ],
  templateUrl: './toolbar.component.html',
  styles: [],
})
export class ToolbarComponent {


  @Input() serviceGeneric: PersonService | UsuarioService | CargoService | UnidadService | FuncionarioService | null  = null;
  @Input() object: Person | User | Cargo | Unidad | Funcionario | null = null;
  tableComponent: any;
  formComponent: any;
  modalDeleteComponent: any;

  private helpersService = inject(HelpersService);

  ngOnInit() {
    if ( this.serviceGeneric ) {
      this.serviceGeneric.eventToolbarComponent.emit(this);

      this.serviceGeneric.eventFormComponent.subscribe((formComponent) => {
        this.formComponent = formComponent;
      });
      
      this.serviceGeneric.eventModalDeleteComponent.subscribe((modalDeleteComponent) => {
        this.modalDeleteComponent = modalDeleteComponent;
      });
      
      this.serviceGeneric.eventTableComponent.subscribe((tableComponent) => {
        this.tableComponent = tableComponent;
      });
    }
  }

  create() { 
    this.formComponent.openCreate(); 
  }
    
  edit() { 
    if ( this.object && this.object.id ) {
      this.formComponent.openEdit(this.object.id as number);
    } else {
      this.helpersService.messageNotification("warn", "Por favor", `Seleccione una Fila`, 3000);
    }
  }

  deleteEntity() { 
    if ( this.object && this.object.id ) {
      this.modalDeleteComponent.openConfirm();
    } else {
      this.helpersService.messageNotification("warn", "Por favor", `Seleccione una Fila`, 3000);
    }
  }

  reload() {
    this.tableComponent.reload();
  }

}
