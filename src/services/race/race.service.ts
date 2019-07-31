import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RacesDTO } from "../../models/race.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class RaceService {

    constructor(public http: HttpClient) {}

    findAll() : Observable<RacesDTO[]> {
        return this.http.get<RacesDTO[]>(`${API_CONFIG.baseUrl}/races`);
    }
}