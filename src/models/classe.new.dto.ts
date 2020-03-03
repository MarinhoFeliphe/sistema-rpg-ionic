import { Attributes } from "../utils/Attributes";
import { ClasseDTO } from "./classe.dto";

export class ClasseNewDTO {
    id: string;
    name: string;
    attributes: Attributes;
    proficiency: string;
    skills: string[];
    description: string;

    constructor(classe: ClasseDTO) {
        this.name = classe.name
        this.attributes = classe.attributes;
        this.proficiency = classe.proficiency;
        this.skills =  classe.skills.map(e => e.id);
        this.description = classe.description;
    }
}