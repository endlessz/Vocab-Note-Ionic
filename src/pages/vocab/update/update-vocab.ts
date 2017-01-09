import { Component } from '@angular/core';
import { VocabService } from '../../../providers/vocab.service';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../home/home';
import { ToastService } from '../../../providers/toast.service';

@Component({
  selector: 'page-update-vocab',
  templateUrl: 'update-vocab.html'
})

export class UpdateVocabPage {
  updateVocabForm: FormGroup
  error: any
  isSubmit: boolean

  constructor(
    public navCtrl: NavController, 
    private vocabService: VocabService, 
    private builder: FormBuilder,
    private navParams: NavParams,
    private toastService: ToastService
  ) {
    this.isSubmit = false
  }

  ngOnInit(){
    this.updateVocabForm = this.builder.group({
        id: ['', Validators.required],
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

    let vocab = this.navParams.get('vocab')
    this.updateVocabForm.patchValue({id: vocab.id})
    this.updateVocabForm.patchValue({word: vocab.word})
    this.updateVocabForm.patchValue({meaning: vocab.meaning})
    this.updateVocabForm.patchValue({example: vocab.example})

    this.updateVocabForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  updateVocab(){
    if(!this.updateVocabForm.valid){
      this.error = "Word and Meaning is required"
      return
    }

    this.isSubmit = true

    this.vocabService.putVocab(this.updateVocabForm.value).subscribe(
      response => {
        this.navCtrl.setRoot(HomePage)
      }, 

      error => {
        if(error.status == 0){
          this.toastService.showToast("No Internet Connection.")
          return;
        }

        this.error = error._body
      },
      
      () => { this.isSubmit = false }
    )
  }

  onValueChanged(data?: any) {
    this.error = ''

    const form = this.updateVocabForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = [];
      this.updateVocabForm[field] = '';

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
    'id': {
      'required':       'id is required'
    },
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