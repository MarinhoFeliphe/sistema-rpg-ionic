import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RaceService } from '../../services/race/race.service';
import { RacesDTO } from '../../models/race.dto';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-races',
  templateUrl: 'races.html',
})
export class RacesPage {

  races: RacesDTO[];
  isBonus: boolean = true;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public raceService: RaceService
    , public menu: MenuController) {
  }

  ionViewDidLoad() {

    this.raceService.findAll()
      .subscribe(response => {
        this.races = response;        
        this.isBonus = (this.races['bonus']) ? true : false;
        console.log(response);
        console.log(this.isBonus);
      },
      error => {
        console.log(error);
      });
    
  }
  
}
