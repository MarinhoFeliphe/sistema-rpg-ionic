import { EquipmentDTO } from "./equipment.dto";

export class WeaponDTO implements EquipmentDTO {
    id: string;
    nome: string;
    aura: string;
    raridade: string;
    quantidade: string;
    especial: string;
    preco: string;
    dano: number;
    tipo: string;
    fn: number;
    grupo: string;
    observacao: string;
    conjunto: string;
    defesa: number;
}