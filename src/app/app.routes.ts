import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PronosticComponent } from './components/pronostic/pronostic.component';
import { PronosticFormComponent } from './components/pronostic-form/pronostic-form.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { PronosticAllComponent } from './components/pronostic-all/pronostic-all.component';
import { WinnerComponent } from './components/winner/winner.component';
import { EnableComponent } from './components/enablepronostic/enable.component';
import { AuthGuard } from './guards/auth.guard';
import { UnclosedMatchComponent } from './components/unclosed-match/unclosed-match.component';

export const routes: Routes = [
    { path : '', component: PronosticComponent, canActivate: [AuthGuard]},
    { path: 'pronostic', component: PronosticComponent,  canActivate: [AuthGuard] },    
    { path: 'nextmatch', component: UnclosedMatchComponent,  canActivate: [AuthGuard] },
    { path: 'pronosticForm/:id', component: PronosticFormComponent, canActivate: [AuthGuard] },
    { path: 'pronosticAll/:matchId', component: PronosticAllComponent, canActivate: [AuthGuard]  },
    { path: 'winner/:matchId', component: WinnerComponent, canActivate: [AuthGuard]  },    
    { path: 'notfound', component: NotFoundComponent, canActivate: [AuthGuard] },
    { path: 'enable', component: EnableComponent, canActivate: [AuthGuard]  }
];