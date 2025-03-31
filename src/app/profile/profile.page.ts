import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ProfileCardComponent } from './proilecard';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule, ProfileCardComponent],
  templateUrl:  './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage  implements OnInit {
  user: any = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    //gets the current users details
    onAuthStateChanged(this.auth, (u) => {
      this.user = u;
    });
  }

  //goes to edit profile page 
  //not yet configured
  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
