import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  email: string
  password: string

  constructor(public navCtrl: NavController, private authenService: AuthenService) {
    this.email = ''
    this.password = ''
  }

  signUp(){
    this.authenService.signUp(this.email, this.password)
  }
}