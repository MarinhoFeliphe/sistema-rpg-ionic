import { ClasseDTO } from "./classe.dto";
import { RacesDTO } from "./race.dto";
import { Level } from "../utils/Level";
import { Attributes } from "../utils/Attributes";
import { SkillDTO } from "./skill.dto";
import { Equipamentos } from "../utils/Equipamentos";

export interface CharacterSheet {
    id: string;
    name: string;
    classe: ClasseDTO;
    race: RacesDTO;
    level: Level;
    coins: number;
    attributes: Attributes;
    healthPoints: number;
    manaPoints: number;
    skills: SkillDTO[];
    equipment: Equipamentos;
}