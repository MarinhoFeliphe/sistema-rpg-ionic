import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RaceService } from '../../services/race/race.service';

@IonicPage()
@Component({
  selector: 'page-races',
  templateUrl: 'races.html',
})
export class RacesPage {

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public raceService: RaceService) {
  }

  ionViewDidLoad() {

    this.raceService.findAll()
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    
  }

}
