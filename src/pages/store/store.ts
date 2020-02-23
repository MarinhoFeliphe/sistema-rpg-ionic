import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  private characterSheet: CharacterSheet;
  private distanceWeapons: WeaponDTO[];
  private bodyWeapons: WeaponDTO[];
  private protectiveEquipment: WeaponDTO[];
  private otherItems: EquipmentDTO[];
  private spellcasterItems: EquipmentDTO[];
  private purchase: Purchase  = { purchaseItems: [] };

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public storeService: StoreService
            , public alertController: AlertController) {}

  ionViewDidLoad() {
    this.characterSheet = this.navParams.get('characterSheet');

    if (this.characterSheet.coins == undefined) {
      this.characterSheet.coins = 400;
    }

    this.storeService.findWeapons().subscribe(weapons => {
      this.distanceWeapons = weapons.filter(e => e.conjunto == 'Armas de Distância');
      this.bodyWeapons = weapons.filter(e => e.conjunto == 'Armas Corporais');
      this.protectiveEquipment = weapons.filter(e => e.conjunto == 'Equipamentos de Proteção');
    });

    this.storeService.findEquipments().subscribe(equipments => {
      this.spellcasterItems = equipments.filter(e => e.conjunto == 'Itens para Conjuradores');
      this.otherItems = equipments.filter(e => e.conjunto == 'Outros Itens');
    });
  }

  addItemToPurchase(item: any) {
  
    if (this.purchase.purchaseItems.includes(item)) {
      let i = this.purchase.purchaseItems.indexOf(item);
      this.purchase.purchaseItems[i]['quantidade'] += 1;
    } else {
      item.quantidade = 1;
      this.purchase.purchaseItems.push(item);
    }

    this.showAlert('Item adicionado a compra');
  }

  showAlert(subTitle: string) {
    const alert = this.alertController.create({
      title: 'Atenção',
      subTitle: subTitle,
      buttons: ['Ok']
    });

    alert.present();
  }

  analyzePurchase() {
    this.navCtrl.push('PurchasePage', { characterSheet:  this.characterSheet, chosenItems: this.purchase});
  }
}
