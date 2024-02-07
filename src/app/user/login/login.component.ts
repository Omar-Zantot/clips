import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  cerdentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait! We are logging you in';
  alertColor = 'blue';

  inSubmission = false;

  constructor(private _auth: AngularFireAuth) {}

  async login() {
    try {
      this.showAlert = true;
      this.inSubmission = true;
      await this._auth.signInWithEmailAndPassword(
        this.cerdentials.email,
        this.cerdentials.password
      );
    } catch (err) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      return;
    }
    this.alertMsg = 'Success! You are now logged in.';
    this.alertColor = 'green';
  }
}
