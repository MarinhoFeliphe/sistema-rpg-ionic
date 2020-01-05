import { Requeriment } from "../utils/Requirement";

export interface SkillDTO {
    id: string;
    name: string;
    description: string;
    feature: string;
    mana: number;
    requirements: Requeriment;
    especial: string;
    example: string;
    magicDifficulty: number;
}