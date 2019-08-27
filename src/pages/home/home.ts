import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email : "",
    password : ""
  };

  constructor(
      public navCtrl: NavController
    , public navParams: NavParams
    , public menu: MenuController
    , public auth: AuthService) {

  }

  ionViewDidLoad() 
  {
    let newUser = this.navParams.get('pNewUser');

    if(newUser) 
    {
      this.creds.email = newUser['email'];
      this.creds.password = newUser['password'];
    }

  }

  ionViewWillEnter() 
  {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() 
  {
    this.menu.swipeEnable(true);
  }

  login() 
  {
    this.auth
      .authenticate(this.creds)
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));        
        this.navCtrl.setRoot('CharacterSheetPage');
      },
      error => {});
  }

  signUp() 
  {
    this.navCtrl.push('SignupPage');
  }

}