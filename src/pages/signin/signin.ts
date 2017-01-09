import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ToastService } from '../../app/services/toast.service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  email: string
  password: string
  error: any

  constructor(
    public navCtrl: NavController, 
    private authenService: AuthenService,
    private toastService: ToastService
  ) {
    this.email = ''
    this.password = ''
  }

  signIn(){
  	this.authenService.signIn(this.email, this.password).subscribe(
      response => {
        this.saveToken(response.token)
        this.goHome()
      }, 

      error => {  
          if(error.status == 0){
            this.toastService.showToast("No Internet Connection.")
            return;
          }

          this.error = "Invalid email or password"
      }
    )
  }

  saveToken(token){
    localStorage.setItem('token', token)
  }

  goSignUp(){
  	this.navCtrl.push(SignupPage)
  }

  goHome(){
    this.navCtrl.setRoot(HomePage)
  }
}