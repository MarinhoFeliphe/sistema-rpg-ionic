import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SkillDTO } from '../../models/skill.dto';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { SkillService } from '../../services/skill/skill.service';
import { CharacterSheetService } from '../../services/character-sheet/character-sheet.service';

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
    , public skillService: SkillService)
  {}

  ionViewDidLoad() 
  {
    this.skillService.setContexto(this);
    this.characterSheet = this.navParams.get('characterSheet');
    this.skills = this.characterSheet.classe.skills;
    this.skillsWithRequirements = this.skills.filter(skill => skill['requirements'] != null);
    
    if(this.skillsWithRequirements) {
      this.skillService.setSkillWithRequirements(this.skillsWithRequirements);
    }
  }

  chooseSkill = (skill: SkillDTO) => this.skillService.skillValidation(skill, this.chosenSkills)

  chooseEquipments = () => this.skillService.chooseEquipments()
}
