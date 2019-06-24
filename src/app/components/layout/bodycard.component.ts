import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'body-card',
    templateUrl: './bodycard.component.html'
})

export class BodyCardComponent {
    

@Input()
title : string = "Forecasters";

@Input()
footer : string = "Experimental Project";    


username : string;

    constructor(private authService : AuthService) {        
        var user = authService.getUser();
        if (user && user.username) {
          this.username = authService.getUser().username;
        }
    }

    signout()
    {
        this.authService.signOut(null);

    }


    
}