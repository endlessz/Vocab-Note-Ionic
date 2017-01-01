import { Component } from '@angular/core';
import { VocabService } from '../../app/services/vocab.service';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AddVocabPage } from '../vocab/addvocab/addvocab';
import { UpdateVocabPage } from '../vocab/updatevocab/updatevocab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  vocabs: any
  isLoading: boolean

  constructor(
    public navCtrl: NavController, 
    private vocabService: VocabService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
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

  presentWordAction(vocab) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Vocab Action -> ' + vocab.word,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Go to edit page');
            this.navCtrl.push(UpdateVocabPage, {
              vocab: vocab
            })
          }
        },{
          text: 'Delete',
          handler: () => {
            this.showDeleteConfirm(vocab)
          }
        },{
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  showDeleteConfirm(vocab) {
    let confirm = this.alertCtrl.create({
      title: 'Delete word?',
      message: "'" + vocab.word + " " + vocab.meaning + "' will be permanently deleted",
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
            this.deleteVocab(vocab)
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