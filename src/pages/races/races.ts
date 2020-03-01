import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { RaceService } from '../../services/race/race.service';
import { RacesDTO } from '../../models/race.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CharacterSheet } from '../../models/character_sheet.dto';

@IonicPage()
@Component({
  selector: 'page-races',
  templateUrl: 'races.html',
})
export class RacesPage {

  races: RacesDTO[];
  characterSheet: CharacterSheet;
  chosenRace: RacesDTO;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public raceService: RaceService
    , public menu: MenuController
    , public alertController: AlertController) {
      this.characterSheet = new CharacterSheet();
    }

  ionViewDidLoad() {
    this.raceService.setContext(this);
    this.raceService.presentRaces();
  }
  
  chooseRace = () => this.raceService.chooseRace()

  ionSlideDidChange = (slides: Slides) => this.raceService.ionSlideDidChange(slides)
}
