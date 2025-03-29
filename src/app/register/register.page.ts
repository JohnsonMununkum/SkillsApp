import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  //validators to make sure name, email & passowrd of length 6 are entered
  //in the registerform
  constructor(private fb: FormBuilder, private router: Router) { 
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //when the register button is clicked get the values from the form
  //get authentication from the firebase api
  //then i create a userwithemailandpassword
  //then the user will be navigated home
  async onRegister() {
    if (this.registerForm.invalid) return;
    const { fullName, email, password } = this.registerForm.value;
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: fullName });
      }
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Registration error:', error.message);
    }
    
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
