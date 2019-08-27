import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClasseDTO } from "../../models/classe.dto";

@Injectable()
export class ClasseService
{
    constructor(public http: HttpClient) {}

    findAll = () : Observable<ClasseDTO[]> => this.http.get<ClasseDTO[]>(`${API_CONFIG.baseUrl}/classes`);
}