import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClasseDTO } from "../../models/classe.dto";
import { ClassePage } from "../../pages/classe/classe";

@Injectable()
export class ClasseService
{
    private classePage: ClassePage;

    constructor(public http: HttpClient) {}

    findAll = () : Observable<ClasseDTO[]> => this.http.get<ClasseDTO[]>(`${API_CONFIG.baseUrl}/classes`);

    chooseClasse(classe: ClasseDTO) {
        this.classePage.characterSheet.classe = classe;
    }

    setContext(classePage: ClassePage) {
        this.classePage = classePage;
    }
}