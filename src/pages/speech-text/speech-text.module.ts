import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeechTextPage } from './speech-text';

@NgModule({
  declarations: [
    SpeechTextPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeechTextPage),
  ],
})
export class SpeechTextPageModule {}
