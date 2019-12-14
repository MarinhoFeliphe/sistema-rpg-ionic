import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
import { SkillPage } from '../../pages/skill/skill';


@Directive({
  selector: '[onclick-skill]'
})
export class OnclickSkillDirective {

  @HostListener('click') onClick() {
    if (this.skillPage.chosenSkills.length <= 2) {
      this.toggleClass('check-skill');
    } else if (this.skillPage.chosenSkills.length == 3 
      && this._elementRef.nativeElement.className.includes('check-skill')) {
        this.toggleClass('check-skill');
    }
  }

  constructor(private _elementRef: ElementRef
            , private _renderer: Renderer
            , private skillPage: SkillPage) {}

  toggleClass(className: string) {
    this._renderer.setElementClass(
      this._elementRef.nativeElement,
      className,
      !this._elementRef.nativeElement.className.includes(className)
    );
  }
}
