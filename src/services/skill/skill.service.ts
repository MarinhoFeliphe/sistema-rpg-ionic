import { Injectable, Renderer, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SkillDTO } from "../../models/skill.dto";
import { AlertController } from "ionic-angular";
import { SkillWithRequirement } from "../../utils/SkillWithRequirement";
import { RequirementType } from "../../utils/Dominio/RequirementType";

@Injectable()
export class SkillService
{
    skillsWithRequirements: SkillWithRequirement[] = [];
    chosenSkills: SkillDTO[] = [];
    private _renderer: Renderer;
    private _el: ElementRef;

    constructor(public http: HttpClient
              , public alertController: AlertController) {}

    changeSkillCardStyle(elementRef: ElementRef, renderer: Renderer) {

        this._renderer = renderer;
        this._el = elementRef;

        if (this.chosenSkills.length <= 2) {
            this.toggleClass('check-skill');
        } else if (this.chosenSkills.length == 3 && 
            this._el.nativeElement.className.includes('check-skill')) {
                this.toggleClass('check-skill');
        }
    }

    private toggleClass(className: string) {
        this._renderer.setElementClass(
            this._el.nativeElement,
            className,
            !this._el.nativeElement.className.includes(className)
        );
    }

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
        
        this.chosenSkills = chosenSkills;
    }

    checkSkillRequirement(currentSkill: SkillDTO, chosenSkills: SkillDTO[], hasBeenRemoved: boolean) {
        this.updateRequirements(currentSkill, chosenSkills, hasBeenRemoved);
        this.updateSkillDependencies();   
        this.toggleSkillBlock(chosenSkills);
        if(currentSkill.requirements && 
            currentSkill.requirements.type == RequirementType.LIMITATION) {
            this.checkLimitations(currentSkill, chosenSkills);
        }
    }

    checkLimitations(currentSkill: SkillDTO, chosenSkills: SkillDTO[]) {
        this.skillsWithRequirements
            .filter(requirementObject => 
                requirementObject.type == RequirementType.LIMITATION &&
                requirementObject.skill.id != currentSkill.id)
            .forEach(requirementObject => {
                document.getElementById(requirementObject.skill.id)['disabled'] = chosenSkills.indexOf(currentSkill) != -1;
            });
    }

    updateRequirements(selectedSkill: SkillDTO, chosenSkills: SkillDTO[], hasBeenRemoved: boolean) {        
        this.skillsWithRequirements.forEach(requirementObject => {
            if(requirementObject.type == RequirementType.EXIGENCY) {
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
            }
        });
    }

    updateSkillDependencies() {
        this.skillsWithRequirements.forEach(requirementObject => {
            if(requirementObject.type == RequirementType.EXIGENCY) {
                let requirements: SkillWithRequirement[] = [];
    
                requirementObject.skill.requirements.skills.forEach(skill =>
                    requirements = this.skillsWithRequirements.filter(requirementObject => 
                        requirementObject.skill.id == skill.id));
    
                requirements.forEach(requirement => {
                    if(requirement.ids.length > 0 && 
                        requirementObject.ids.indexOf(requirement.skill.id) == -1) {
                        requirementObject.ids.push(requirement.skill.id);
                    }
                });
            }
        });
    }

    toggleSkillBlock(chosenSkills: SkillDTO[]) {
        this.skillsWithRequirements.forEach(requirementObject => {
            let element: HTMLElement = document.getElementById(requirementObject.skill.id);
            
            if(requirementObject.type == RequirementType.EXIGENCY) {
                if(requirementObject.ids.length == 0) {
                    element['disabled'] = false;
                } else {
                    element['disabled'] = true;   
                    element.firstElementChild.classList.remove('check-skill');
                    if(chosenSkills.indexOf(requirementObject.skill) != -1) {                
                        chosenSkills.splice(chosenSkills.indexOf(requirementObject.skill), 1);
                    }
                }
            }
        });
    }

    setSkillWithRequirements(skillsWithRequirements: SkillDTO[]) {

        let requirementObjects: SkillWithRequirement[] = [];

        skillsWithRequirements.forEach(skill => {
            let skillWithRequirement: SkillWithRequirement = { skill : null, ids : [], type : null };
            skillWithRequirement.skill = skill;
            if(skill.requirements.skills) {
                skillWithRequirement.ids = skill.requirements.skills.map(e => e.id);
            }
            skillWithRequirement.type = skill.requirements.type;
            requirementObjects.push(skillWithRequirement);
        });

        this.skillsWithRequirements = requirementObjects;
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