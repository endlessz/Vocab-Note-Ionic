import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

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
      //Need callback because asynchronous
      localStorage.setItem('token', response.token)
      
      this.navCtrl.setRoot(HomePage)
    }, error => {  
        this.error = "Invalid email or password"
    })
  }

  goSignUp(){
  	this.navCtrl.push(SignupPage)
  }
}