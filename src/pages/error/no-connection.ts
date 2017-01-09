import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html'
})

export class NoConnectionPage {

  constructor(
    public navCtrl: NavController
  ) { }

  goToHome(){
    this.navCtrl.setRoot(HomePage)
  }
} 