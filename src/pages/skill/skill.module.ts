import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SkillPage } from './skill';
import { OnclickSkillDirective } from '../../directives/onclick-skill/onclick-skill';

@NgModule({
  declarations: [
    SkillPage,
    OnclickSkillDirective
  ],
  imports: [
    IonicPageModule.forChild(SkillPage),
  ],
})
export class SkillPageModule {}
