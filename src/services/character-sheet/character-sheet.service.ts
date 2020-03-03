import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CharacterSheet } from "../../models/character_sheet.dto";
import { StorageService } from "../storage.service";
import { UserService } from "../user/user.service";
import { CharacterSheetNewDTO } from "../../models/character_sheet.new.dto";

@Injectable()
export class CharacterSheetService
{
    constructor(
        public http: HttpClient
      , public storageService: StorageService
      , public userService: UserService) {}

    finishingTouches(characterSheet: CharacterSheet) {
        this.userService
        .findByEmail(this.storageService.getLocalUser().email)
        .subscribe(user => {
            characterSheet.manaPoints = 60;
            characterSheet.healthPoints = 60;
    
            if (characterSheet.attributes.agility > characterSheet.attributes.strength) {
                characterSheet.defense = characterSheet.attributes.agility + 5;
            } else {
                characterSheet.defense = characterSheet.attributes.strength + 5;
            }

            this.userService
                .insertCharacterSheet(user.email, new CharacterSheetNewDTO(characterSheet))
                .subscribe(res => {
                    console.log(res);
                });

            console.log(characterSheet);
            console.log(user);
        });
    }
}