import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipmentDTO } from '../../models/equipment.dto';
import { WeaponDTO } from '../../models/weapon.dto';
import { Purchase } from '../../utils/Purchase';

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  
  private purchase: Purchase = { purchaseItems: [] };
  private amount: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {}

  ionViewDidLoad() {
   this.purchase = this.navParams.get('chosenItems');
   this.calculateAmount();
  }

  decrease(item) {
    let i = this.purchase.purchaseItems.indexOf(item);
    this.purchase.purchaseItems[i]['quantidade'] -= 1;

    if (this.purchase.purchaseItems[i]['quantidade'] == 0) {
      this.removeItem(item);
    } else {
      this.amount -= item['preco'];
    }

  }

  increase(item) {
    let i = this.purchase.purchaseItems.indexOf(item);
    this.purchase.purchaseItems[i]['quantidade'] += 1;
    this.amount += item['preco'];
  }

  removeItem(item)  {
    let i = this.purchase.purchaseItems.indexOf(item);
    this.purchase.purchaseItems.splice(i, 1);
    this.calculateAmount();
  }

  calculateAmount() {
    if (this.purchase.purchaseItems.length) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.amount = this.purchase.purchaseItems.map(e => e.preco * e.quantidade).reduce(reducer);
    } else {
      this.amount = 0;
    }
  }

  closeAgreement() {
    
  }
}
