import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  userForm;
   constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
   this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
	  password: ['',[Validators.required, Validators.required, Validators.minLength(8),
	  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    });
  }
  
   onSubmit(){
    if(this.userForm.valid){
      this.http.get('https://ecommerce-module.herokuapp.com/hello_world', this.userForm.value)
      .subscribe((response)=>{
        console.log('repsonse ',response);
      })
    }
  }
  
}
