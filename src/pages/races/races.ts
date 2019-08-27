import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public raceService: RaceService
    , public menu: MenuController
    , public alertController: AlertController) {}

  ionViewDidLoad() 
  {
    this.raceService.findAll()
      .subscribe(response => {
        this.races = response; 
        this.showAlert('Atenção', 'Clique no botão acima dos atributos para escolher aquela raça.')
      },
      error => {}); 
  }
  
  showAlert(title: string, subTitle: string)
  {
    const alert = this.alertController.create(
    {
      title: title,
      subTitle: subTitle,
      buttons: ['Ok']
    });

    alert.present();
  }

  ionSlideDoubleTap() 
  {
    //Não está funcionando, invesigar o motivo [25/08/2019]
    console.log('Duplo click');
  }
}
