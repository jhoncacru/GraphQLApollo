import { Injectable, EventEmitter } from "@angular/core";
import { CanActivate, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService, ConfigService } from "../services/auth.service";
import { LocalSessionService } from "../services/localSessionService";
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {   

    onAuthTokenInfoSetted : EventEmitter<string> = new EventEmitter();
    
    constructor(private router: Router,
        private authService: AuthService,
        private sessionService : LocalSessionService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {

        if (localStorage.getItem(ConfigService.AUTH_TOKEN) !== null) {
            return true;
        }

        if (window.location.href.indexOf('wreply') > 0) {
            let token = this.getParameterByName('wreply');
            localStorage.setItem(ConfigService.AUTH_TOKEN, token);

            this.sessionService.GettingUserInfoPromise(this.authService.getUser().username).then(res => {
                //alert(this.authService.getUser().username);
                //console.log("Guarding existent user");  
                window.location.href = this.removeParam("wreply", window.location.href);                
            }).catch(err => 
                {
                //console.log("Errorrrrr");                
                this.router.navigate(['/notfound']); });
                     
        }
        else {            
            window.location.href =  this.authService.getSignInAuthUrlRequest();
            return false;
        }
    }


    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((success, failure) => {
            this.authService.isLoggedIn().then(logged => {
                if (logged) {
                    success(false);
                } else {
                    success(false);
                }
            }).catch(err => failure(err));
        });
    }

    getParameterByName(name) {
        var decoded = decodeURIComponent(window.location.search);
        var q = decoded.match(new RegExp('[?&]' + name + '=([^&#]*)'));
        return q && q[1];
    }

    removeParam(key, sourceURL) {
        var rtn = sourceURL.split("?")[0],
            param,
            params_arr = [],
            queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }

}