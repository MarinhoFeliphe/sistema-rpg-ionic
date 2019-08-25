import { CharacterSheet } from "./character_sheet.dto";
import { FormGroup } from '@angular/forms';

export class UserDTO {
    
    id: string;
    email: string;
    password: string;
    characterSheet: CharacterSheet;
    perfis: string[];

    constructor(formGroup: FormGroup) {
        this.email = formGroup.value.email;
        this.password = formGroup.value.password;
        this.perfis = ['2'];
    }
}