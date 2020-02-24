import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Purchase } from '../../utils/Purchase';
import { CharacterSheet } from '../../models/character_sheet.dto';
import { PurchaseService } from '../../services/store/purchase.service';

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  
  public purchase: Purchase = { purchaseItems: [] };
  public characterSheet: CharacterSheet;
  public amount: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public purchaseService: PurchaseService) {}

  ionViewDidLoad() {
   this.purchase = this.navParams.get('chosenItems');
   this.characterSheet = this.navParams.get('characterSheet');
   this.purchaseService.setContexto(this);
   this.purchaseService.calculateAmount();
  }

  decrease = item => this.purchaseService.decrease(item)

  increase = item => this.purchaseService.increase(item)

  removeItem = item => this.purchaseService.removeItem(item)

  calculateAmount = () => this.purchaseService.calculateAmount()

  closeAgreement = () => this.purchaseService.closeAgreement()
}
