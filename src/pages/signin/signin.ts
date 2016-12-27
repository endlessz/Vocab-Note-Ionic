import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  email: string
  password: string

  error: any

  constructor(public navCtrl: NavController, private authenService: AuthenService) {
    this.email = ''
    this.password = ''
  }

  signIn(){
  	this.authenService.signIn(this.email, this.password).subscribe(response => {
      this.navCtrl.push(HomePage)
    }, error => {  
        this.error = "Invalid email or password"
    })
  }

  goSignUp(){
  	this.navCtrl.push(SignupPage)
  }
}