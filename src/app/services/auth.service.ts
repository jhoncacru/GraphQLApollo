import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

    constructor(public httpClient: HttpClient) {

    }

    public isLoggedIn(): Promise<Boolean> {
        return new Promise((success, failure) => {
            if (this.getUser())
                success(true);
            failure(new Error("Error is LoggedIn"));
        });
    }

    getUser(): User {

        var localToken = localStorage.getItem(ConfigService.AUTH_TOKEN)
        if (localToken) {

            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(localToken);
            const expirationDate = helper.getTokenExpirationDate(localToken);
            const isExpired = helper.isTokenExpired(localToken);

            var user = new User(
                decodedToken.claims.authm,
                decodedToken.claims.cid,
                decodedToken.claims.dob,
                decodedToken.claims.uname,
                decodedToken.claims.email,
                decodedToken.claims.full,
                decodedToken.claims.lang,
                decodedToken.claims.memberof,
                decodedToken.claims.phone,
                decodedToken.claims.provider,
                decodedToken.claims.sid,
                decodedToken.claims.UId,
                decodedToken.claims.pic);
            return user;

        }

        return null;
    }

    getParameterByName(name) {
        var decoded = decodeURIComponent(window.location.search);
        var q = decoded.match(new RegExp('[?&]' + name + '=([^&#]*)'));
        return q && q[1];
    }


    getSignInAuthUrlRequest(): string {
        //let config = ConfigService.getInstance();
        var sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        //var authUrl = config.authUrl;
        var authUrl = environment.authUrl;
        var op = "signin";
        //var clientId = config.appKey;
        var clientId = environment.appKey;

        var wreply = window.location.href;
        var method = "GET";

    

        var rparams = `id=${sessionId};wreply=${wreply};lang=en-US;rp=${clientId};mr=${method}`;
        var authUrlFull = `${authUrl}?op=${op}&rparams=${rparams}`;

       
        return authUrlFull;

    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
    }

    signOut(forkUrl: string) {
        var currentSessionToken = localStorage.getItem(ConfigService.AUTH_TOKEN);

        var authUrl = environment.authUrl;
        var op = "signout";
        forkUrl = window.location.href;
        var rparams = `id=${this.getUser().sid};wreply=${forkUrl};lang=en-US;mr=POST`;
        var authUrlFull = `${authUrl}?op=${op}&rparams=${rparams}`;

        localStorage.removeItem(ConfigService.AUTH_TOKEN);
        localStorage.removeItem(ConfigService.USER_TICK);
        window.location.href = authUrlFull;
    }
   
}

@Injectable()
export class ConfigService {
    public static readonly AUTH_TOKEN = "auth_token";
    public static readonly USER_TICK = "tick";    
}


export class User {

    authm: string;
    clientId: string;
    dateOfBirth: string;

    username: string;
    email: string;
    fullname: string;
    lang: string;
    memberof: string;
    phone: string;
    provider: string;
    sid: string;
    uid: string;

    pictureUrl: string;

    constructor(
        _authm: string,
        _cid: string,
        _dob: string,
        _uname: string,
        _email: string,
        _full: string,
        _lang: string,
        _memberof: string,
        _phone: string,
        _provider: string,
        _sid: string,
        _UId: string,
        _picurl: string) {
        this.authm = _authm
        this.clientId = _cid;
        this.dateOfBirth = _dob;

        this.username = _uname;
        this.email = _email;
        this.fullname = _full;
        this.lang = _lang;
        this.memberof = _memberof;
        this.phone = _phone;
        this.provider = _provider;
        this.sid = _sid;
        this.uid = _UId;
        this.pictureUrl = _picurl;
    }

}