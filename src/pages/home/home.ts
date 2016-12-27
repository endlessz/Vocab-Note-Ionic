import { Component } from '@angular/core';
import { VocabService } from '../../app/services/vocab.service';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  vocabs: any

  constructor(public navCtrl: NavController, private vocabService: VocabService) {
  }

  ngOnInit(){
  	this.getVocabs()
  }

  getVocabs(){
  	this.vocabService.getVocabs().subscribe(response => {
  		console.log(response)
  		this.vocabs = response.data
  	}, error => {
  		if(error.status == 401){
  			console.log("Unauthen")
  			this.navCtrl.setRoot(SigninPage)
  		}
  	})
  }

}