import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { UserDTO } from "../../models/user.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { CharacterSheet } from "../../models/character_sheet.dto";
import { CharacterSheetNewDTO } from "../../models/character_sheet.new.dto";

@Injectable()
export class UserService {
    
    constructor(public http: HttpClient,
                public storage: StorageService) {}

    findByEmail(email: string) : Observable<UserDTO> {
        return this.http.get<UserDTO>(`${API_CONFIG.baseUrl}/users/email?value=${email}`);
    }

    insert(newUser : UserDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/users`,
            newUser,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    insertCharacterSheet(email: string, characterSheetNewDTO: CharacterSheetNewDTO) {
        return this.http.patch(
            `${API_CONFIG.baseUrl}/users?email=${email}`,
            characterSheetNewDTO
        )
    }
}