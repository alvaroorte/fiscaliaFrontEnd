import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from 'src/app/shared/prime-components/prime-components.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeComponentsModule],
  standalone: true,
})
export class HeaderComponent {
    constructor(private router: Router) {}
  
    items: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [] ;
    itemsBase: { label: string, icon: string, items: any, routerLink: string[], routerLinkActive: string }[] = [
        {
            label: 'Personas',
            icon: 'pi pi-user',
            items: [
                // {
                //     label: 'Nuevo',
                //     icon: 'pi pi-fw pi-plus',
                // },
                // {
                //     label: 'Editar',
                //     icon: 'pi pi-fw pi-pencil',
                // },
                // {
                //     separator: true
                // },
                // {
                //     label: 'Borrar',
                //     icon: 'pi pi-fw pi-trash'
                // }
            ],
            routerLink: ['/people'],
            routerLinkActive: 'active'
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            items: [],
            routerLink: ['/users'],
            routerLinkActive: 'active'
        }
    ] ;

    ngOnInit() {
        this.items = this.itemsBase;
    }

    filterHeader( event: any ) {
        this.items = [];
        for (let item of this.itemsBase) {
            if ( item.label.toLowerCase().indexOf( event.target.value.toLowerCase() ) > -1 ) {
                this.items.push(item);
            }
        }
    }
}

