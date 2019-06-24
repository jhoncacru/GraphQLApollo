import { Injectable } from "@angular/core";
import { UserModel } from "../models/userModel";
import { HttpClient } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { environment } from "../../environments/environment";
import { ConfigService } from "./auth.service";


@Injectable()
export class LocalSessionService
{    
    private sessionUser : UserModel;

    constructor(private http : HttpClient) {        
        this.sessionUser = new UserModel();
    }

    GetSessionUser()
    {
        return this.sessionUser;
    }

    GetSessionUserId()
    {
        return localStorage.getItem(ConfigService.USER_TICK);
    }


    GettingUserInfoPromise(username : string): Promise<UserModel> {        
        return new Promise((success, failure) => {          
            this.getUserInfoByService(username).subscribe(user=> {
                if(user != null)
                {
                     let u = user as any;
                     //console.log("user", u);
                     this.sessionUser.id = u.id;
                     this.sessionUser.email = u.email;
                     this.sessionUser.username = u.username;

                    localStorage.setItem(ConfigService.USER_TICK,u.id);

                    success(this.sessionUser);
                }
                else
                {
                    failure("Inexistent Player!!")
                }
            });
            
        });
    }

    getUserInfoByService(username : string)
    {
        var url = environment.apiUrl+"/api/opened/player/"+username;
        return this.http.get(url);
    }
}