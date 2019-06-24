import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppComponent } from './app.component';
import { PronosticComponent } from './components/pronostic/pronostic.component';
import { routes } from "./app.routes";
import { PronosticFormComponent } from './components/pronostic-form/pronostic-form.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
// import { CallbackComponent } from './components/callback/callback.component';
import { LocalSessionService } from './services/localSessionService';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { PronosticAllComponent } from './components/pronostic-all/pronostic-all.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'
import { environment } from '../environments/environment';
import { WinnerComponent } from './components/winner/winner.component';
import { EnableComponent } from './components/enablepronostic/enable.component';
import { LiveMatchService } from './services/livematch.service';
import { LiveResultComponent } from './components/liveresult/liveresult.component';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService, AuthService } from './services/auth.service';
import { BodyCardComponent } from './components/layout/bodycard.component';
import { TabComponent } from './components/tabs/tab.component';
import { TabsComponent } from './components/tabs/tabs.components';
import { UnclosedMatchComponent } from './components/unclosed-match/unclosed-match.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PronosticComponent,
    PronosticFormComponent,
    EnableComponent,
    NotFoundComponent,
    PronosticAllComponent,
    WinnerComponent,
    LiveResultComponent,
    BodyCardComponent,
    UnclosedMatchComponent,

    TabComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(routes),    
  ],
  //schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [HttpLink, LocalSessionService, LiveMatchService, AuthService, AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo:Apollo, httpLink:HttpLink) {
    

    var headersObj = new HttpHeaders();
   headersObj.append("user_tick", localStorage.getItem(ConfigService.USER_TICK));
   headersObj.append("otro", "1111111");
   

    apollo.create({
      link:  httpLink.create({uri: environment.apiUrl+'/graphql/', headers : headersObj}),
      cache: new InMemoryCache()
    
    });

   


  }
}
