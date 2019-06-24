// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// // import { OAuthService } from 'angular-oauth2-oidc';
// import { LocalSessionService } from '../../services/localSessionService';


// @Component({
//     template: './callback.component.html'
// })

// export class CallbackComponent implements OnInit {

//     constructor(private router: Router, private oauthService: OAuthService, private sessionService: LocalSessionService) {
//     }

//     ngOnInit(): void {

//         console.log("Sending to signin");
//         this.oauthService.loadDiscoveryDocument().then(() => {
//             this.oauthService.tryLogin().then(_ => {
//                 if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
//                     this.oauthService.initImplicitFlow();
//                 }
//                 else {
//                     let claims = this.oauthService.getIdentityClaims();
//                     if (!claims) throw "Session is not initialized!!";

//                     let c = claims as any;
//                     this.sessionService.GettingUserInfoPromise(c.preferred_username).then(res => {
//                         this.router.navigate(['/pronostic']);
//                     }).catch(err => this.router.navigate(['/notfound']));
//                 }
//             })
//         });
//     }
// }