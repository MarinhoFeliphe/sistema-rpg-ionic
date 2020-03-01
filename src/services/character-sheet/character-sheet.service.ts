import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CharacterSheet } from "../../models/character_sheet.dto";

@Injectable()
export class ClasseService
{
    constructor(public http: HttpClient) {}

    finishingTouches(characterSheet: CharacterSheet) {
        characterSheet.manaPoints = 60;
        characterSheet.healthPoints = 60;
    }
}