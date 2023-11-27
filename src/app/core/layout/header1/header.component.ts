import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from 'src/app/shared/prime-components/prime-components.module';
import { LocalStorageService } from '@core/services/local-storage.service';
import { LoginService } from '@core/services/login.service';
import { LoginComponent } from '@shared/components/login/login.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, PrimeComponentsModule],
  standalone: true,
})
export class HeaderComponent implements OnInit {

    localStorageService = inject(LocalStorageService);
    loginService = inject(LoginService);
    private router =  inject(Router);
    
    username = signal('Login');
    loginComponent!: LoginComponent;

    optionsUser: MenuItem[] | undefined;

    ngOnInit(): void {
        this.loginService.eventFormComponent.subscribe((loginComponent) => {
            this.loginComponent = loginComponent;
        });
        
        this.loginService.eventChangeUserComponent.subscribe(() => {
            this.getUserLocalStorage();
        });
        
        this.getUserLocalStorage();

        this.optionsUser = [
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-file',
                command: () => {
                    this.logout();
                }
            }
        ];
    }
    logout() {
        this.loginComponent.logout();
        this.router.navigate(['/']);
    }

    getUserLocalStorage() {
        const user = this.localStorageService.get('username');
        (user)? this.username.set(user): this.username.set('Login');
    }

    setOpenModalLogin() {
        this.loginComponent.openLogin();
    }
}

