import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UpdateVocabPage } from '../update/update-vocab';

@Component({
  selector: 'page-show-vocab',
  templateUrl: 'show-vocab.html'
})

export class ShowVocabPage {
  vocab: any

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams
  ) { }

  ngOnInit(){
    this.vocab = this.navParams.get('vocab')
  }

  goToEditPage(){
    this.navCtrl.push(UpdateVocabPage, {
            vocab: this.vocab
    })
  }
}