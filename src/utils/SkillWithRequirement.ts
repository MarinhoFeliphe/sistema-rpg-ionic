import { SkillDTO } from "../models/skill.dto";

export interface SkillWithRequirement {
    skill: SkillDTO;
    ids: string[];
}