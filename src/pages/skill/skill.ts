import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SkillDTO } from '../../models/skill.dto';
import { CharacterSheet } from '../../models/character_sheet.dto';

@IonicPage()
@Component({
  selector: 'page-skill',
  templateUrl: 'skill.html',
})
export class SkillPage {

  skills: SkillDTO[];
  characterSheet: CharacterSheet;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) 
  {}

  ionViewDidLoad() 
  {
    this.characterSheet = this.navParams.get('characterSheet');
    this.skills = this.characterSheet.classe.skills;
  }

}
