import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public storage: StorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [      
      { title: 'Minha Ficha', component: 'CharacterSheetPage'},
      { title: 'Mercado', component: ''},
      { title: 'Logout', component: ''},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.nav.setRoot('HomePage');
      break;
      case 'Mercado':
        let characterSheet = this.storage.getLocalUser().characterSheet
        this.nav.setRoot('StorePage', { characterSheet });
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}
