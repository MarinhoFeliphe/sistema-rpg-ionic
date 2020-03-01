import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { WeaponDTO } from "../../models/weapon.dto";
import { API_CONFIG } from "../../config/api.config";
import { EquipmentDTO } from "../../models/equipment.dto";
import { AlertController } from "ionic-angular";
import { StorePage } from "../../pages/store/store";

@Injectable()
export class StoreService {

    private storePage: StorePage;

    constructor(public http: HttpClient
                , public alertController: AlertController) {}

    findWeapons = () : Observable<WeaponDTO[]> => this.http.get<WeaponDTO[]>(`${API_CONFIG.baseUrl}/weapons`);

    findEquipments = () : Observable<EquipmentDTO[]> => this.http.get<EquipmentDTO[]>(`${API_CONFIG.baseUrl}/equipments`);

    addItemToPurchase(item: any) {
  
        if (this.storePage.purchase.purchaseItems.includes(item)) {
          let i = this.storePage.purchase.purchaseItems.indexOf(item);
          this.storePage.purchase.purchaseItems[i]['quantidade'] += 1;
        } else {
          item.quantidade = 1;
          this.storePage.purchase.purchaseItems.push(item);
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

    loadItems() {
        this.storePage.storeService.findWeapons().subscribe(weapons => {
            this.storePage.distanceWeapons = weapons.filter(e => e.conjunto == 'Armas de Distância');
            this.storePage.bodyWeapons = weapons.filter(e => e.conjunto == 'Armas Corporais');
            this.storePage.protectiveEquipment = weapons.filter(e => e.conjunto == 'Equipamentos de Proteção');
        });
    
        this.storePage.storeService.findEquipments().subscribe(equipments => {
        this.storePage.spellcasterItems = equipments.filter(e => e.conjunto == 'Itens para Conjuradores');
        this.storePage.otherItems = equipments.filter(e => e.conjunto == 'Outros Itens');
        });
    }

    rewardBeginner() {
        if (this.storePage.characterSheet.coins == undefined) {
            this.storePage.characterSheet.coins = 400;
        }
    }

    analyzePurchase() {
        this.storePage.navCtrl.push('PurchasePage'
        , { characterSheet:  this.storePage.characterSheet, chosenItems: this.storePage.purchase});
    }

    setContext(storePage: StorePage) {
        this.storePage = storePage;
    }

}