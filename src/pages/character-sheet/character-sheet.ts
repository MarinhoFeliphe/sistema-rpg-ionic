import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
})
export class CharacterSheetPage {

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  chooseTheRace() {
    this.navCtrl.push('RacesPage');
  }

}
