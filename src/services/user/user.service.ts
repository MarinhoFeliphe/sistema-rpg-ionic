import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { UserDTO } from "../../models/user.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class UserService {
    
    constructor(public http: HttpClient,
                public storage: StorageService) {}

    findByEmail(email: string) : Observable<UserDTO> {
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/users/email?value=${email}`);
    }
}