import { Component, inject } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { passwordMatchValidation } from '../../../../shared/helper/password-match';
import { EmailValidators, NameValidators, PasswordValidators } from '../../../../shared/helper/validators';
import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessagesComponent,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  resMsg:string='';
  isLoading :boolean=true;
  registerForm !: FormGroup;

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

// this is form group and there is form builder
//form group is class
  // registerForm = new FormGroup({
  //   name : new FormControl(null,[
  //     Validators.required,
  //     Validators.minLength(2),
  //     Validators.maxLength(20)
  //   ]),
  //   email : new FormControl(null,[
  //     Validators.required,
  //     Validators.email
  //     ]),
  //     password : new FormControl(null,[
  //       Validators.required,
  //       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

  //       ]),
  //     rePassword : new FormControl(null,[
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.maxLength(20)
  //       ])
  // },{validators: this.passwordMatchValidation});

  // form builder is a service and the best practice
  // and best practice to add form in a function and add it on ng onInit
  formInit(){
    this.registerForm = this.fb.group({
      name : [null,NameValidators],
      email :[null,EmailValidators],
        password :[null,PasswordValidators],
        rePassword :[null,PasswordValidators]
    },{validators:[ passwordMatchValidation]});
  }




// i add this function  in shared folder (helper) to reuse
  // passwordMatchValidation(control: AbstractControl){
  //   return control.get('password')?.value === control.get('rePassword')?.value ?null : { mismatch: true };
  //   // let pass = control.get('password')?.value;
  //   // let rePass = control.get('rePassword')?.value;
  //   // if(pass === rePass){
  //   //   return null;
  //   //   }
  //   //   else{
  //   //     return {mismatch: true};
  //   //   }
  // }

  submitForm(){
    this.isLoading =false;
    if(this.registerForm.valid || !this.isLoading){
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this.isLoading = true;
          if(res.message=='success'){
            this.router.navigate(['/login'])
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

  //without disabled in button
  // sendData = () =>{
  //   if(this.registerForm.valid){
  //     console.log(this.registerForm.value);
  //   }
  //   else{
  //     this.registerForm.get('rePassword')?.setValue(null)
  //     this.registerForm.markAllAsTouched()
  //   }
  // }



  ngOnInit(): void {

    this.formInit()

  }
}
