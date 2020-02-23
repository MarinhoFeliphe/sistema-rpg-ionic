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
    , public alertController: AlertController) 
    {
      this.characterSheet = new CharacterSheet();
    }

  ionViewDidLoad() {
    this.raceService.findAll()
      .subscribe(response =>  {
        this.races = response;
        this.chosenRace = this.races[0]; 
        this.showAlert('Atenção', 'Todas as habilidades de raça são do tipo Suporte');
      },
      error => {}); 
  }
  
  showAlert(title: string, subTitle: string) {
    const alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });

    alert.present();
  }
  
  chooseRace() {
    this.characterSheet.race = this.chosenRace;
    this.navCtrl.push('ClassePage', { characterSheet :  this.characterSheet});
  }

  ionSlideDidChange(slides: Slides) {
    slides._slides.forEach((slide, index) => {
      if (slide.className.includes('swiper-slide-active')) {
        this.chosenRace = this.races[index];
      }
    });
  }
}
