import { Component, EventEmitter, Input, OnInit, Output, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '@core/services/helpers.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { LoginService } from '@core/services/login.service';
import { LoginRequest } from '@core/models/Login';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, PrimeComponentsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HelpersService]
})
export class LoginComponent implements OnInit {

    private formBuilder = inject(FormBuilder);
    private helpersService = inject(HelpersService);
    private localStorageService = inject(LocalStorageService);
    private loginService = inject(LoginService);
    
    openModal: boolean = false;
    isLoading = false;

    ngOnInit(): void {
        this.loginService.eventFormComponent.emit(this);
    }

    public formLogin: FormGroup = this.formBuilder.group({
        email: [, Validators.required],
        password: [, [Validators.required]],
    });

    hideModal() {
        this.openModal = false;
        this.isLoading = false;
    };

    openLogin(){
        this.reset();
        this.openModal = true;
    };
    
    reset(): void {
        this.isLoading = false;
        this.formLogin.reset();
    };

    submitLogin() {
        this.isLoading = true;
        const data: LoginRequest = {
        ...this.formLogin.value,
        };
        this.loginService.login(data).subscribe({
        next: (res) => { 
            this.helpersService.messageNotification("success", "Correcto", `¡${res.username} Bienvenido!.`, 3000);
            this.hideModal();
            this.localStorageService.set('token', res.token as string);
            this.localStorageService.set('username', res.username as string);
            this.loginService.eventChangeUserComponent.emit();
            this.reset();
        },
        error: (err) => { 
            this.isLoading = false;
            console.log(err);
            this.helpersService.messageNotification("error", err.eroor, err.message, 3000);
        }
        })
    };

    logout( ) {
        this.localStorageService.removeAll();
        this.loginService.eventChangeUserComponent.emit();
    }
}
