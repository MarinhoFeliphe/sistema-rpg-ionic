import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SkillDTO } from "../../models/skill.dto";
import { AlertController } from "ionic-angular";

@Injectable()
export class SkillService
{
    constructor(public http: HttpClient
              , public alertController: AlertController) {}

    skillValidation(skill: SkillDTO, chosenSkills: SkillDTO[]) {
        let indexOfSkill = chosenSkills.indexOf(skill);
        let skillExistsInArray = indexOfSkill != -1;

        if (skillExistsInArray) {
            chosenSkills.splice(indexOfSkill, 1);
        } else {
            chosenSkills.push(skill);
        }

        if(chosenSkills.length > 3) {
            chosenSkills.splice(indexOfSkill, 1);
            this.showAlert('Atenção','Você já escolheu 3 habilidades, deseja avançar para a escolha dos equipamentos?');
        }
    }

    showAlert(title: string, subTitle: string)
    {
        const alert = this.alertController.create(
        {
        title: title,
        subTitle: subTitle,
        buttons: [
            {
            text: 'Sim',
            handler: data => {
                console.log('Sim clicked');
            }
            },
            {
            text: 'Não',
            handler: data => {
                console.log('Não clicked');
            }
            }
        ]
        });

        alert.present();
    }
}