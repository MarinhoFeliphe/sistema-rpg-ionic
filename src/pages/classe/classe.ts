import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharacterSheet } from '../../models/character_sheet.dto';

@IonicPage()
@Component({
  selector: 'page-classe',
  templateUrl: 'classe.html',
})
export class ClassePage {

  characterSheet: CharacterSheet;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams) 
  {}

  ionViewDidEnter()
  {
    this.characterSheet = this.navParams.get('characterSheet');
  }

  ionViewDidLoad() 
  {
    
  }
}
