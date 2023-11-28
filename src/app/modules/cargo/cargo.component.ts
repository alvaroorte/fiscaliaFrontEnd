import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersService } from '@core/services/helpers.service';
import { CargoService } from './services/cargo.service';
import { Cargo } from '@core/models/Cargo';
import { CargoModule } from './cargo.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-cargo',
  standalone: true,
  imports: [CargoModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './cargo.component.html',
  styles: [
  ],
  providers: [ HelpersService ]
})
export class CargoComponent {

  cargoService = inject(CargoService);

  cargo = signal(new Cargo);   

  ngOnInit(): void {
    this.cargo.set(new Cargo);
  }

  setObject( cargo: Cargo  ) {
    this.cargo.set(cargo);
  }

}
