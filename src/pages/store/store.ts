import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { WeaponDTO } from '../../models/weapon.dto';
import { StoreService } from '../../services/store/store.service';
import { EquipmentDTO } from '../../models/equipment.dto';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  private characterSheet: CharacterSheet;
  private distanceWeapons: WeaponDTO[] = [];
  private bodyWeapons: WeaponDTO[] = [];
  private protectiveEquipment: WeaponDTO[] = [];
  private otherItems: EquipmentDTO[] = [];
  private spellcasterItems: EquipmentDTO[] = [];

  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public storeService: StoreService) {}

  ionViewDidLoad() {
    this.characterSheet = this.navParams.get('characterSheet');
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
}
