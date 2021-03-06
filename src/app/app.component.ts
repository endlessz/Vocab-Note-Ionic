import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthenService } from '../providers/authen.service';
import { ToastService } from '../providers/toast.service';
import { VocabService } from '../providers/vocab.service';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html',
  providers: [AuthenService, ToastService, VocabService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];

    if(!this.isAuthenticated()){
      this.rootPage = SigninPage
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    localStorage.clear()
    this.nav.setRoot(SigninPage)
  }

  private isAuthenticated(){
     return localStorage.getItem('token')
  }
}
