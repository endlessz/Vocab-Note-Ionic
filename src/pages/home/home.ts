import { Component } from '@angular/core';
import { VocabService } from '../../app/services/vocab.service';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AddVocabPage } from '../vocab/addvocab/addvocab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  vocabs: any
  isLoading: boolean

  constructor(
    public navCtrl: NavController, 
    private vocabService: VocabService
  ) { }

  ngOnInit(){
  	this.getVocabs()
  }

  getVocabs(){
    this.isLoading = true

  	this.vocabService.getVocabs().subscribe(
      response => {
    		this.vocabs = response.data
  	  }, 

      error => {
    		if(error.status == 401){
    			console.log("Unauthentication")
    			this.navCtrl.setRoot(SigninPage)
    		}
  	  },

      () => { this.isLoading = false }
    )
  }

  goToAddVocab(){
    this.navCtrl.push(AddVocabPage)
  }
}