import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { RacesDTO } from "../../models/race.dto";
import { Slides } from "ionic-angular";
import { RacesPage } from "../../pages/races/races";

@Injectable()
export class RaceService 
{
    private racesPage: RacesPage;

    constructor(public http: HttpClient) {}

    findAll = () : Observable<RacesDTO[]>  => this.http.get<RacesDTO[]>(`${API_CONFIG.baseUrl}/races`);

    ionSlideDidChange(slides: Slides) {
        slides._slides.forEach((slide, index) => {
          if (slide.className.includes('swiper-slide-active')) {
            this.racesPage.chosenRace = this.racesPage.races[index];
          }
        });
    }

    presentRaces() {
      this.findAll()
        .subscribe(races =>  {
            this.racesPage.races = races;
            this.racesPage.chosenRace = this.racesPage.races[0]; 
            this.showAlert('Atenção', 'Todas as habilidades de raça são do tipo Suporte');
        },
        error => {}); 
    }

    chooseRace() {
        this.racesPage.characterSheet.race = this.racesPage.chosenRace;
        this.racesPage.characterSheet.attributes = this.racesPage.characterSheet.race.attributes;
        this.racesPage.navCtrl.push('ClassePage', { characterSheet :  this.racesPage.characterSheet});
    }

    showAlert(title: string, subTitle: string) {
        const alert = this.racesPage.alertController.create({
          title: title,
          subTitle: subTitle,
          buttons: ['Ok']
        });
    
        alert.present();
    }

    setContext(racesPage: RacesPage) {
        this.racesPage = racesPage;
    }
}