import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  resMsg:string='';
  isLoading :boolean=true;
  cartId!:string;
  checkOutForm!:FormGroup;


  private readonly orderService = inject(OrderService)
  private readonly activateRoute = inject(ActivatedRoute)
  private readonly fb = inject(FormBuilder)





  formInit(){
    this.checkOutForm = this.fb.group({
      details :["",[
        Validators.required
      ]],
      phone :["",[
        Validators.required,
        // Validators.pattern('^[0-9]*$'),
        // Validators.minLength(10),
        // Validators.maxLength(10)
      ]],
      city:["",[
        Validators.required
      ]]
    })
  }

  submitForm(){
    this.isLoading =false;
    if(this.checkOutForm.valid || !this.isLoading){
      console.log(this.checkOutForm.value);
      this.orderService.createCheckOut(this.cartId,this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = true;
          window.open(res.session.url,'_self');
        },
        error:(err)=>{
          console.log(err);
        }
      })

    }
  }

  getCartId(){
    this.activateRoute.params.subscribe({
      next: (params)=>{
        this.cartId = params['id'];
        console.log(this.cartId);

      }
    })
  }

  ngOnInit(): void {
    this.formInit();
    this.getCartId();
  }
}


