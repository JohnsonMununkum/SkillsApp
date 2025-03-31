import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-card *ngIf="user">
      <ion-item lines="none">
        <ion-avatar slot="start">
          <img [src]="user.photoURL || 'assets/default-avatar.png'" alt="User Avatar">
        </ion-avatar>
        <ion-label>
          <h2>{{ user.displayName || 'User' }}</h2>
          <p>{{ user.email }}</p>
        </ion-label>
      </ion-item>
    </ion-card>
  `,
  styleUrls: ['./profile.page.scss']
})
export class ProfileCardComponent  {
  @Input() user: any;
}
