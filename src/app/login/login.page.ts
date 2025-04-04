import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//added imports for the form
import { FormsModule,FormGroup,FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
//for authentication login through firebase
//router for navigation
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  //form group declaration
  loginForm!: FormGroup;
  //variables
  email: string = '';
  password: string = '';

  //constructor for the ifrebase authentication 
  //and for the router for navigation
  constructor(
    private auth: Auth,
    private router: Router,
    private fb: FormBuilder
  ) { }

  async login() {
    //if form isnt filled out properly ouput to the console
    if (this.loginForm.invalid) {
      console.error('Please fill in the form correctly.');
      return;
    }
    const { email, password } = this.loginForm.value;
    //gets the users email and password input
    //if correct user is logged in
    //and is then navigated to the home page
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('Logged in:', userCredential.user?.email);
      this.router.navigate(['/home']);
      //if details are not correct an error is displayed 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  
  //validators for the form
  ngOnInit() {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


}


