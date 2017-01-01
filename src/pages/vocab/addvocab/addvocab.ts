import { Component } from '@angular/core';
import { VocabService } from '../../../app/services/vocab.service';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../home/home';

@Component({
  selector: 'page-addvocab',
  templateUrl: 'addvocab.html'
})

export class AddVocabPage {
  addVocabForm: FormGroup
  error: any
  isSubmit: boolean

  constructor(
    public navCtrl: NavController, 
    private vocabService: VocabService, 
    private builder: FormBuilder
  ) {
  	this.isSubmit = false
  }

  ngOnInit(){
  	this.addVocabForm = this.builder.group({
        word: ['', Validators.compose([
            Validators.maxLength(200),
            Validators.required
         ])],
        meaning: ['', Validators.compose([
            Validators.maxLength(200),
            Validators.required
        ])],
        example: ['', Validators.compose([
            Validators.maxLength(1000)
        ])]
    });

    this.addVocabForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  addVocab(){
    if(!this.addVocabForm.valid){
    	this.error = "Word and Meaning is required"
    	return
    }

    this.isSubmit = true

    this.vocabService.postVocab(this.addVocabForm.value).subscribe(response => {
      this.navCtrl.setRoot(HomePage)
    }, error => {
    	this.isSubmit = false
        this.error = error._body
    })
  }

  onValueChanged(data?: any) {
  	  this.error = ''

      const form = this.addVocabForm;

      for (const field in this.formErrors) {
        this.formErrors[field] = [];
        this.addVocabForm[field] = '';

        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            this.formErrors[field].push(messages[key]);
          }
        }
      }
  }

  formErrors = {
    'word': [],
    'meaning': [],
    'example': []
  }

  validationMessages = {
    'word': {
      'required':       'Word is required',
      'maxlength':      'Word cannot contain up to 200 characters.',
    },
    'meaning': {
      'required':       'Meaning is required.',
      'maxlength':      'Meaning cannot contain up to 200 characters.',
    },
    'example': {
      'maxlength':      'Example cannot contain up to 1000 characters.'
    }
  };
}