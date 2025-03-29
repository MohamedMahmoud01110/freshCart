import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  resMsg:string='';
  isLoading :boolean=true;
  showPassword: boolean = false;


  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)


  loginForm = new FormGroup({
    email : new FormControl(null,[
      Validators.required,
      Validators.email
      ]),
      password : new FormControl(null,[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ])
  })

  submitForm(){
    this.isLoading =false;
    if(this.loginForm.valid || !this.isLoading){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this.isLoading = true;
          if(res.message=='success'){
            this.authService.saveToken(res.token);
            this.router.navigate(['/home'])
          }
        },
        error: (error) => {
          console.error(error);
          this.resMsg = error.error.message;
          this.isLoading = true;
        }
      })
    }
  }



    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }


  //without disabled in button
  // sendData = () =>{
  //   if(this.loginForm.valid){
  //     console.log(this.loginForm.value);
  //   }
  //   else{
  //     this.loginForm.get('rePassword')?.setValue(null)
  //     this.loginForm.markAllAsTouched()
  //   }
  // }

