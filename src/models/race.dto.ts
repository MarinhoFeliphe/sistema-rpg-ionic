import { Attributes } from "../utils/Attributes";
import { Skill } from "./skill.dto";

export interface RacesDTO {
    id: string;
    name: string;
    attributes: Attributes;
    bonus: string;
    commonClasses: string;
    raceSkill: Skill
}