import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AddVocabPage } from '../pages/vocab/addvocab/addvocab';
import { UpdateVocabPage } from '../pages/vocab/updatevocab/updatevocab';
import { ShowVocabPage } from '../pages/vocab/show/show-vocab';
import { NoConnectionPage } from '../pages/error/no-connection';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    AddVocabPage,
    UpdateVocabPage,
    NoConnectionPage,
    ShowVocabPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    AddVocabPage,
    UpdateVocabPage,
    NoConnectionPage,
    ShowVocabPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})

export class AppModule {}