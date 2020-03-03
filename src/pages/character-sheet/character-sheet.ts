import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user/user.service';
import { UserDTO } from '../../models/user.dto';
import { LocalUser } from '../../models/local_user';

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
          if (!this.criarFichar)  {
            let localUser: LocalUser = this.storage.getLocalUser();
            localUser.characterSheet =  this.user.characterSheet;

            this.storage.setLocalUser(localUser);

            console.log(this.storage.getLocalUser().characterSheet);
          }
        },
        error => {});
    }
  }

  chooseTheRace() {
    this.navCtrl.push('RacesPage');
  }

}
