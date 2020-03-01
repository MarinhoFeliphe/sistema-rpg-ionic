import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { WeaponDTO } from '../../models/weapon.dto';
import { StoreService } from '../../services/store/store.service';
import { EquipmentDTO } from '../../models/equipment.dto';
import { Purchase } from '../../utils/Purchase';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  characterSheet: CharacterSheet;
  purchase: Purchase  = { purchaseItems: [] };
  distanceWeapons: WeaponDTO[];
  bodyWeapons: WeaponDTO[];
  protectiveEquipment: WeaponDTO[];
  otherItems: EquipmentDTO[];
  spellcasterItems: EquipmentDTO[];

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public storeService: StoreService
            , public alertController: AlertController
            , public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    this.characterSheet = this.navParams.get('characterSheet');
    this.storeService.setContext(this);
    this.storeService.loadItems();
    this.storeService.rewardBeginner();
  }

  addItemToPurchase = item => this.storeService.addItemToPurchase(item)

  analyzePurchase = () => this.storeService.analyzePurchase()
}
