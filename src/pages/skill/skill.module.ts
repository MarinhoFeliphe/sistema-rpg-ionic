import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkillPage } from './skill';
import { OnclickSkillDirective } from '../../directives/onclick-skill/onclick-skill';
import { FormatRequirementPipe } from '../../pipes/format-requirement/format-requirement';

@NgModule({
  declarations: [
    SkillPage,
    OnclickSkillDirective,
    FormatRequirementPipe
  ],
  imports: [
    IonicPageModule.forChild(SkillPage),
  ],
})
export class SkillPageModule {}
