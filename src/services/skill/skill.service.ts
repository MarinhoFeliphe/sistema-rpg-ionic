import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SkillDTO } from "../../models/skill.dto";
import { AlertController } from "ionic-angular";
import { SkillWithRequirement } from "../../utils/SkillWithRequirement";

@Injectable()
export class SkillService
{
    skillsWithRequirements: SkillWithRequirement[] = [];

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
        } else {
            this.checkSkillRequirement(skill, chosenSkills, skillExistsInArray);
        }
        
    }

    checkSkillRequirement(skill: SkillDTO, chosenSkills: SkillDTO[], hasBeenRemoved: boolean) {
        this.updatingRequirements(skill, chosenSkills, hasBeenRemoved);
        this.updatingSkillDependencies();
        this.toggleSkillBlock(chosenSkills);
    }

    updatingRequirements(selectedSkill: SkillDTO, chosenSkills: SkillDTO[], hasBeenRemoved: boolean) {        
        this.skillsWithRequirements.forEach(requirementObject => {
            requirementObject.skill.requirements.skills.forEach(skillRequirement => {
                if(hasBeenRemoved) {
                    if(skillRequirement.id == selectedSkill.id) {
                        requirementObject.ids.push(selectedSkill.id);                        
                    }
                } else {
                    chosenSkills.forEach(chsSkill => {
                        if(skillRequirement.id == chsSkill.id) {
                            requirementObject.ids.splice(requirementObject.ids.indexOf(chsSkill.id), 1);
                        }
                    });
                }
            });
        });
    }

    updatingSkillDependencies() {
        this.skillsWithRequirements.forEach(requirementObject => {

            let requirements: SkillWithRequirement[] = [];

            requirementObject.skill.requirements.skills.forEach(skill => {
                requirements = this.skillsWithRequirements.filter(e => e.skill.id == skill.id);
            });

            requirements.forEach(requirement => {
                if(requirement.ids.length > 0 && 
                    requirementObject.ids.indexOf(requirement.skill.id) == -1) {
                    requirementObject.ids.push(requirement.skill.id);
                }
            });
        });
    }

    toggleSkillBlock(chosenSkills: SkillDTO[]) {
        this.skillsWithRequirements.forEach(e => {
            let element: HTMLElement = document.getElementById(e.skill.id);

            if(e.ids.length == 0) {
                element['disabled'] = false;
            } else {
                element['disabled'] = true;   
                element.firstElementChild.classList.remove('check-skill');
                if(chosenSkills.indexOf(e.skill) != -1) {                
                    chosenSkills.splice(chosenSkills.indexOf(e.skill), 1);
                }
            }
        });
    }

    setSkillWithRequirements(skillsWithRequirements: SkillDTO[]) {

        skillsWithRequirements.map(skill => {
            let skillWithRequirement: SkillWithRequirement = { skill : null, ids : [] };
            skillWithRequirement.skill = skill;
            skillWithRequirement.ids = skill.requirements.skills.map(e => e.id);
            this.skillsWithRequirements.push(skillWithRequirement);
        });
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