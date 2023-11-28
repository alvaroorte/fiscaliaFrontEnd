import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadService } from './services/unidad.service';
import { Unidad } from '@core/models/Unidad';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { UnidadModule } from './unidad.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-unidad',
  standalone: true,
  imports: [CommonModule, UnidadModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './unidad.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class UnidadComponent {

  unidadService = inject(UnidadService);

  unidad = signal(new Unidad);   

  ngOnInit(): void {
    this.unidad.set(new Unidad);
  }

  setObject( unidad: Unidad  ) {
    this.unidad.set(unidad);
  }

}
