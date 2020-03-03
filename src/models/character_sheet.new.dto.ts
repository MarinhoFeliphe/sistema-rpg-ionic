import { RacesDTO } from "./race.dto";
import { Level } from "../utils/Level";
import { Attributes } from "../utils/Attributes";
import { SkillDTO } from "./skill.dto";
import { Equipamentos } from "../utils/Equipamentos";
import { CharacterSheet } from "./character_sheet.dto";
import { ClasseNewDTO } from "./classe.new.dto";

export class CharacterSheetNewDTO
{
    id: string;
    name: string;
    classe: ClasseNewDTO;
    race: RacesDTO;
    level: Level;
    coins: number;
    attributes: Attributes;
    healthPoints: number;
    manaPoints: number;
    skills: SkillDTO[];
    equipment: Equipamentos;
    defense: number;

    constructor(characterSheet: CharacterSheet){
        this.name = characterSheet.name;
        this.classe = new ClasseNewDTO(characterSheet.classe);
        this.race = characterSheet.race;
        this.level = characterSheet.level;
        this.coins = characterSheet.coins;
        this.attributes = characterSheet.attributes;
        this.healthPoints = characterSheet.healthPoints;
        this.manaPoints = characterSheet.manaPoints;
        this.skills = characterSheet.skills;
        this.equipment = characterSheet.equipment;
        this.defense = characterSheet.defense;
    }
}