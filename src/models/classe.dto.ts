import { Attributes } from "../utils/Attributes";
import { SkillDTO } from "./skill.dto";

export interface ClasseDTO {
    id: string;
    name: string;
    attributes: Attributes;
    proficiency: string;
    skills: SkillDTO[];
    description: string;
}