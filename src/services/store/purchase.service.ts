import { Injectable } from "@angular/core";
import { PurchasePage } from "../../pages/purchase/purchase";
import { AlertController } from "ionic-angular";
import { WeaponDTO } from "../../models/weapon.dto";
import { EquipmentDTO } from "../../models/equipment.dto";

@Injectable()
export class PurchaseService {

    private purchasePage: PurchasePage;

    constructor(public alertController: AlertController) {}

    calculateAmount() {
        if (this.purchasePage.purchase.purchaseItems.length) {
          const reducer = (accumulator, currentValue) => accumulator + currentValue;
          this.purchasePage.amount = this.purchasePage.purchase.purchaseItems.map(e => e.preco * e.quantidade).reduce(reducer);
        } else {
          this.purchasePage.amount = 0;
        }
    }

    removeItem(item)  {
        let i = this.purchasePage.purchase.purchaseItems.indexOf(item);
        this.purchasePage.purchase.purchaseItems.splice(i, 1);
        this.calculateAmount();
    }

    decrease(item) {
        let i = this.purchasePage.purchase.purchaseItems.indexOf(item);
        this.purchasePage.purchase.purchaseItems[i]['quantidade'] -= 1;
    
        if (this.purchasePage.purchase.purchaseItems[i]['quantidade'] == 0) {
          this.removeItem(item);
        } else {
            this.purchasePage.amount -= item['preco'];
        }
    
    }

    increase(item) {
        let i = this.purchasePage.purchase.purchaseItems.indexOf(item);
        this.purchasePage.purchase.purchaseItems[i]['quantidade'] += 1;
        this.purchasePage.amount += item['preco'];
    }

    setContexto(purchasePage: PurchasePage) {
        this.purchasePage = purchasePage;
    }

    closeAgreement() {
        if (this.purchasePage.amount > this.purchasePage.characterSheet.coins) {
            this.showAlert('Moedas insuficientes.', 'Nada feito!');
        } else {
            this.purchasePage.characterSheet.coins -= this.purchasePage.amount;

            let weapons: WeaponDTO[] = [];
            let equipamentos: EquipmentDTO[] = [];

            this.purchasePage.purchase.purchaseItems.forEach(item => {
                if (item.conjunto == 'Itens para Conjuradores' 
                    || item.conjunto == 'Outros Itens') {
                    equipamentos.push(item);
                } else {
                    weapons.push(item);
                }
            });

            this.purchasePage.characterSheet.equipment = { weapons, equipamentos, potions: [] }

            this.showAlert('Acordo fechado.', 'Volte mais vezes!');
            this.removeAllItems();
        }
    }

    showAlert(subTitle: string, title: string) {
        const alert = this.alertController.create({
          title,
          subTitle,
          buttons: ['Ok']
        });
    
        alert.present();
    }

    removeAllItems() {
        this.purchasePage.purchase.purchaseItems = [];
        this.calculateAmount();
    }
}