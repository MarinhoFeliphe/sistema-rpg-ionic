import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { WeaponDTO } from '../../models/weapon.dto';
import { StoreService } from '../../services/store/store.service';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  private characterSheet: CharacterSheet;
  private weapons: WeaponDTO[] = [];

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public storeService: StoreService) {}

  ionViewDidLoad() {
    this.characterSheet = this.navParams.get('characterSheet');
    this.storeService.findWeapons().subscribe(weapons => this.weapons = weapons);
  }

}
