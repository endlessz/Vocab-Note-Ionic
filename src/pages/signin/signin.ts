import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController, private authenService: AuthenService) {
  }

  signIn(){
  	this.authenService.signIn("test", "test")
  }

  goSignUp(){
  	this.navCtrl.push(SignupPage)
  }
}