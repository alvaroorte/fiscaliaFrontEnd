import { Component, inject, signal } from '@angular/core';
import { PersonService } from './services/person.service';
import { Person } from '@core/models/Person';
import { PersonaModule } from './persona.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { HelpersService } from '@core/services/helpers.service';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ PersonaModule, ToolbarComponent, ModaldeleteComponent],
  templateUrl: './persona.component.html',
  styles: [
  ],
  providers: [ HelpersService ]
})
export class PersonaComponent {

  personService = inject(PersonService);

  enterprises = signal<Person[]>([]);
  object = signal(new Person);   

  ngOnInit(): void {
    console.log("siiiiiiii");
    
    this.object.set(new Person);
  }

  setObject( object: Person  ) {
    this.object.set(object);
  }

}
