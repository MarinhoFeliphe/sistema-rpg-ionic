import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
import { SkillService } from '../../services/skill/skill.service';


@Directive({
  selector: '[onclick-skill]'
})
export class OnclickSkillDirective {

  @HostListener('click') onClick() {
    this.skillService.changeSkillCardStyle(this._elementRef, this._renderer);
  }

  constructor(private _elementRef: ElementRef
            , private _renderer: Renderer
            , private skillService: SkillService) {}
}
