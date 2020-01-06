import { Pipe, PipeTransform } from '@angular/core';
import { Requeriment } from '../../utils/Requirement';

@Pipe({
  name: 'formatRequirement',
})
export class FormatRequirementPipe implements PipeTransform {
  
  transform(value: Requeriment, ...args) {

    let response: string = '';

    if (value.description) {
      response = value.description;
    } else {
      let formattedValue: string = '';
      let lastItemIndex: number = value.skills.length -1;
  
      if (value.level) {
        formattedValue = `Nivel: ${value.level};`;
      }
  
      if (value.skills) {
        value.skills.forEach((skill, index) => {
          formattedValue += (index < lastItemIndex) ? ` ${skill.name},` : ` ${skill.name}.`;
        });
      }

      response = formattedValue;
    }


    return response;
  }
}
