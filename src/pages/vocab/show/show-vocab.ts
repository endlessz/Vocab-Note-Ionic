import { Component } from '@angular/core';
import { VocabService } from '../../../providers/vocab.service';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UpdateVocabPage } from '../update/update-vocab';
import { HomePage } from '../../home/home';

@Component({
  selector: 'page-show-vocab',
  templateUrl: 'show-vocab.html'
})

export class ShowVocabPage {
  vocab: any
  isLoading: boolean

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private vocabService: VocabService
  ) { }

  ngOnInit(){
    this.vocab = this.navParams.get('vocab')
  }

  goToEditPage(){
    this.navCtrl.push(UpdateVocabPage, {
        vocab: this.vocab
    })
  }

  showDeleteConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete word?',
      message: "'" + this.vocab.word + " " + this.vocab.meaning + "' will be permanently deleted",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'DELETE',
          handler: () => {
            this.deleteVocab(this.vocab)
          }
        }
      ]
    });

    confirm.present();
  }

  private deleteVocab(vocab){
    this.isLoading = true

    this.vocabService.deleteVocab(vocab).subscribe(
      response => {
        this.navCtrl.setRoot(HomePage)
      }, 

      error => {
        console.log(error)
      },

      () => { this.isLoading = false }
    )
  }
}