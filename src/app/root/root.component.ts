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
  
  error_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
	  { type: 'pattern', message: 'First Name must contain letters only.' }
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required.' },
	  { type: 'pattern', message: 'Last Name must contain letters only.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Please enter a valid email address.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must have minimum 8 characters' },
      { type: 'pattern', message: 'Password must contain letters, at least on uppercase, digits, special chars' }
    ]
  }
  
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
      this.http.post('https://ecommerce-module.herokuapp.com/done', this.userForm.value,{responseType: 'text'})
      .subscribe((response)=>{
        console.log('response ',response);
		this.http.get("https://ecommerce-module.herokuapp.com/hello_world");
      })
    } else {
      alert('User registration is not valid!!')
    }
  }
  
}
