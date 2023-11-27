import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { HelpersService } from '@core/services/helpers.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeComponentsModule } from '../../prime-components/prime-components.module';
import { PersonService } from 'src/app/modules/persona/services/person.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PrimeComponentsModule ],
  templateUrl: './modal-delete.component.html',
  styles: []
})
export class ModaldeleteComponent {
  @Input() serviceGeneric: PersonService | any;
  @Input() object: number | any;
  tableComponent: any;

  private helpersService = inject(HelpersService);
  
  openModal: boolean = false;

  ngOnInit() {
    if ( this.serviceGeneric ) {
      this.serviceGeneric.eventModalDeleteComponent.emit(this);

      this.serviceGeneric.eventTableComponent.subscribe((tableComponent: any) => {
        this.tableComponent = tableComponent;
      });
    }
  }

  public openConfirm() {
      this.openModalDelete(true);
  }

  confirmDelete() {
    this.openModalDelete(false);
    this.serviceGeneric.delete( parseInt(this.object) ).subscribe({
      next: ( res:string ) => {
        this.helpersService.messageNotification("success", "Correcto", "", null);
        this.tableComponent.reload();
      },
      error: (err: any) => { 
        console.log(err);
      }
    })
  }
  openModalDelete(state: any) {
    this.openModal = state;
  }
}







