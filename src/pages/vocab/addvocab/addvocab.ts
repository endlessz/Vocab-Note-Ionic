import { Component } from '@angular/core';
import { VocabService } from '../../../app/services/vocab.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-addvocab',
  templateUrl: 'addvocab.html'
})

export class AddVocabPage {

  constructor(public navCtrl: NavController, private vocabService: VocabService) {
  }
}