import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from '@core/models/Funcionario';
import { HelpersService } from '@core/services/helpers.service';
import { FuncionarioModule } from './funcionario.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [ FuncionarioModule, ToolbarComponent, ModaldeleteComponent ],
  templateUrl: './funcionario.component.html',
  styles: [
  ],
  providers: [ HelpersService]
})
export class FuncionarioComponent {

  funcionarioService = inject(FuncionarioService);

  funcionario = signal(new Funcionario);   

  ngOnInit(): void {
    this.funcionario.set(new Funcionario);
  }

  setObject( funcionario: Funcionario  ) {
    this.funcionario.set(funcionario);
  }

}
