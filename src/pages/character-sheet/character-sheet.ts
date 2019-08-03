import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';
import { UserDTO } from '../../models/user.dto';

@IonicPage()
@Component({
  selector: 'page-character-sheet',
  templateUrl: 'character-sheet.html',
})
export class CharacterSheetPage {

  user: UserDTO;
  criarFichar: boolean = false;

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public storage: StorageService
    , public userService: UserService) {
  }

  ionViewDidLoad() {
    
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.userService
        .findByEmail(localUser.email)
        .subscribe(response => {
          this.user = response;
          this.criarFichar = (this.user.characterSheet) ? false : true;
        },
        error => {});

    }
  }

  chooseTheRace() {
    this.navCtrl.push('RacesPage');
  }

}
