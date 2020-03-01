import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { ClasseService } from '../../services/classe/classe.service';
import { ClasseDTO } from '../../models/classe.dto';

@IonicPage()
@Component({
  selector: 'page-classe',
  templateUrl: 'classe.html',
})
export class ClassePage {

  classes: ClasseDTO[];
  characterSheet: CharacterSheet;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public classeService: ClasseService) {}

  ionViewDidEnter() {
    this.characterSheet = this.navParams.get('characterSheet');
    this.classeService.setContext(this);
  }

  ionViewDidLoad() {
    this.classeService.findAll()
      .subscribe(response => {
        this.classes = response;
      },
      error => {});
  }

  chooseClasse(classe: ClasseDTO) {
    this.classeService.chooseClasse(classe);
    this.navCtrl.push('SkillPage', { characterSheet :  this.characterSheet});
  }
}
