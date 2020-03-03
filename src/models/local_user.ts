import { CharacterSheet } from "./character_sheet.dto";

export interface LocalUser {
    token: string;
    email: string;
    characterSheet: CharacterSheet;
}