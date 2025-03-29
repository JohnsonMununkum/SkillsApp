import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,FormGroup} from '@angular/forms';
//for authentication login through firebase
//router for navigation
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  //variables
  email: string = '';
  password: string = '';

  //constructor for the ifrebase authentication 
  //and for the router for navigation
  constructor(
    private auth: Auth,
    private router: Router
  ) { }

  async login() {
    //gets the users email and password input
    //if correct user is logged in
    //and is then navigated to the home page
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log('Logged in:', userCredential.user?.email);
      this.router.navigate(['/home']);
      //if details are not correct an error is displayed 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  
  
  ngOnInit() {
  }


}


