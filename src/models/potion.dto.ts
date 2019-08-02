import { EquipmentDTO } from "./equipment.dto";
import { SkillDTO } from "./skill.dto";
import { Equipamentos } from "../utils/Equipamentos";

export class PotionDTO implements EquipmentDTO {
    id: string;
    nome: string;
    aura: string;
    raridade: string;
    quantidade: string;
    especial: string;
    preco: string;
    ingredientes: string;
    healthPoints: number;
    manaPoints: number;
    skills: SkillDTO[];
    equipment: Equipamentos;
}