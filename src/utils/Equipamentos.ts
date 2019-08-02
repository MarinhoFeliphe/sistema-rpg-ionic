import { WeaponDTO } from "../models/weapon.dto";
import { EquipmentDTO } from "../models/equipment.dto";
import { PotionDTO } from "../models/potion.dto";

export interface Equipamentos {
    weapons: WeaponDTO[];
    equipamentos: EquipmentDTO[];
    potions: PotionDTO[];
}