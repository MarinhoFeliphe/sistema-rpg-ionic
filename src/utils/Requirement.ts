import { SkillDTO } from "../models/skill.dto";

export interface Requeriment {
    level: number;
    skills: SkillDTO[];
    type: string;
    description: string;
}