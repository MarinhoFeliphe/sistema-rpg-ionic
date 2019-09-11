import { Component } from '@angular/core';
import { NavController, Platform, IonicPage} from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-speech-text',
  templateUrl: 'speech-text.html',
})
export class SpeechTextPage {

  matches: String[];
  isRecording = false;
 
  constructor(
      public navCtrl: NavController
    , public speechRecognition: SpeechRecognition
    , public plt: Platform
    , public cd: ChangeDetectorRef) { }
 
  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      }).catch(e => {
        alert(e);
      });
  }
 
  startListening() {
    /*let options = {
      language: 'en-US'
    }*/
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

}
