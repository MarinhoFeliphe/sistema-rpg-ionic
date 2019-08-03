import { CharacterSheet } from "./character_sheet.dto";

export interface UserDTO {
    id: string;
    email: string;
    password: string;
    characterSheet: CharacterSheet;
    perfis: string[];
}