import { Component } from '@angular/core';
import { AuthenService } from '../../app/services/authen.service';
import { ToastService } from '../../app/services/toast.service';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserValidator } from '../../app/validators/user.validator';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  signUpForm: FormGroup
  error: any
  isSubmit: boolean

  constructor(public navCtrl: NavController, private authenService: AuthenService
              , private toastService: ToastService, private builder: FormBuilder) {
    this.isSubmit = false
  }

  ngOnInit(){
    this.signUpForm = this.builder.group({
        email: ['', Validators.compose([
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
            Validators.required
         ])],
        username: ['', Validators.compose([
            UserValidator.usernameTaken,
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]+$'),
            Validators.required
        ])],
        password: ['', Validators.compose([
            Validators.minLength(6),
            Validators.required
        ])]
    });

    this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  signUp(){
    this.isSubmit = true

    this.authenService.signUp(this.signUpForm.value).subscribe(response => {
      this.navCtrl.pop()

      this.toastService.showToast("Register Successful")
    }, error => {
        this.isSubmit = false
        this.error = error._body
    })
  }

  onValueChanged(data?: any) {
      const form = this.signUpForm;

      for (const field in this.formErrors) {
        this.formErrors[field] = [];
        this.signUpForm[field] = '';

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
    'email': [],
    'username': [],
    'password': []
  }

  validationMessages = {
    'email': {
      'required':       'Email is required',
      'pattern':        'Please enter a valid email.'
    },
    'username': {
      'required':       'Username is required.',
      'maxlength':      'Username cannot contain up to 20 characters.',
      'pattern':        'Please use only numbers and letters(a-z).',
      'usernameTaken':  'Username already taken.'
    },
    'password': {
      'required':       'Password is required',
      'minlength':      'Password must be at least 6 characters long.'
    }
  };
}