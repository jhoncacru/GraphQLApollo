import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PronosticService } from './../../services/pronostic.service';
import { ConfigService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pronostic-form',
  templateUrl: './pronostic-form.component.html',
  styleUrls: ['./pronostic-form.component.css'],
  providers: [PronosticService]
})
export class PronosticFormComponent implements OnInit {
  pronostic:any;
  isSuccessSave:boolean= false;
  isErrorSave:boolean=false;
  errors:string;
  
  constructor(public svc:PronosticService, public router:Router, private activatedRoute: ActivatedRoute) {
    this.pronostic = {};
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== "undefined") { 
        this.svc.getPronosticById(params['id']).valueChanges.subscribe(x => 
        {
          this.pronostic=x.data.pronosticById;
          // if(this.pronostic.player.id !=  localStorage.getItem(ConfigService.USER_TICK)) {           
          //   this.router.navigate(['/notfound'])
          // }
        });
      };
    });
  }

  cancel() {
    this.router.navigate(['pronostic']);
  }

  async save(firstTeamGoals, secondTeamGoals) {
    this.isErrorSave = false;
    this.isSuccessSave = false;

    let sessionId = localStorage.getItem(ConfigService.USER_TICK);

    if(this.pronostic.player.id != sessionId) {
      this.isErrorSave = true;
      this.errors = "Por favor dijimos no intentar hackear"
      return;
    }


    if(firstTeamGoals.trim() == "" || secondTeamGoals.trim()=="")
    {
      this.isErrorSave = true;
      this.errors = "Los resultados son requeridos."
      return;
    }

    let firstPenal = <HTMLInputElement>document.getElementById('cbxPenalFirst');
    let secondPenal = <HTMLInputElement>document.getElementById('cbxPenalSecond');
    
    if(firstPenal.checked || secondPenal.checked) {
      if(firstPenal.checked && firstTeamGoals < secondTeamGoals){
        this.isErrorSave = true;
        this.errors = "El resultado del equipo seleccionado debe ser mayor"
        return;
      }
      if(secondPenal.checked && secondTeamGoals < firstTeamGoals){
        this.isErrorSave = true;
        this.errors = "El resultado del equipo seleccionado debe ser mayor"
        return;
      }
      if((secondPenal.checked ||firstPenal.checked)  && (secondTeamGoals == firstTeamGoals)){
        this.isErrorSave = true;
        this.errors = "No existe empate en penales"
        return;
      }

      this.svc.savePronostic(this.pronostic.id, firstTeamGoals, secondTeamGoals, true);
    }      
    else{
      this.svc.savePronostic(this.pronostic.id, firstTeamGoals, secondTeamGoals, false);        
    }
    
    this.isSuccessSave = true;

  }


 sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  changePenal(e) {
    let txtFirst = <HTMLInputElement>document.getElementById('txtFirstTeamGoals');
    let txtSecond = <HTMLInputElement>document.getElementById('txtSecondTeamGoals');
    let firstPenal = <HTMLInputElement>document.getElementById('cbxPenalFirst');
    let secondPenal = <HTMLInputElement>document.getElementById('cbxPenalSecond');
    
    if(e.target.checked) {
      if(e.target.id == "cbxPenalSecond"){        
        firstPenal.checked = false;
      }else{        
        secondPenal.checked = false;
      }
    }
    if(!firstPenal.checked && !secondPenal.checked){
      txtFirst.disabled = false;
      txtSecond.disabled = false;
    }
    if(firstPenal.checked ) {
      txtFirst.value = "1";
      txtSecond.value = "0";
      txtFirst.disabled = true;
      txtSecond.disabled = true;
    }
    if(secondPenal.checked) {
      txtSecond.value = "1";
      txtFirst.value =  "0";
      txtFirst.disabled = true;
      txtSecond.disabled = true;
    }
      
  }
}
