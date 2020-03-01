import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SkillDTO } from '../../models/skill.dto';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { SkillService } from '../../services/skill/skill.service';

@IonicPage()
@Component({
  selector: 'page-skill',
  templateUrl: 'skill.html',
})
export class SkillPage {

  skills: SkillDTO[];
  characterSheet: CharacterSheet;
  chosenSkills: SkillDTO[] = [];
  skillsWithRequirements: SkillDTO[];

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public alertController: AlertController
    , public skillService: SkillService)
  {}

  ionViewDidLoad() 
  {
    this.characterSheet = this.navParams.get('characterSheet');
    this.skills = this.characterSheet.classe.skills;
    this.skillsWithRequirements = this.skills.filter(skill => skill['requirements'] != null);
    
    if(this.skillsWithRequirements) {
      this.skillService.setSkillWithRequirements(this.skillsWithRequirements);
    }
  }

  chooseSkill = (skill: SkillDTO) => this.skillService.skillValidation(skill, this.chosenSkills);

  chooseEquipments() {
    this.characterSheet.skills = this.skillService.getChosenSkills();
    this.navCtrl.push("StorePage", { characterSheet :  this.characterSheet});
  }
}
