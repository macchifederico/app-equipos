import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import jugadores from 'src/assets/json/jugadores.json'

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent {

  jugadores: any = [];
  promedio: any;
  teamOne : any = [];
  teamTwo : any = [];
  jugadoresSeleccionados: any = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.sacarPromedios();
  
  }

  sacarPromedios(){
    this.jugadores = jugadores.jugadores;    
    this.jugadores.forEach((jugador: any) => {
      const habilidadValues: number[] = Object.values(jugador.habilidades);
      const sumaTotal = habilidadValues.reduce((acc : number, val : number) => acc + val, 0);
      const promedio = sumaTotal / habilidadValues.length / 20;      
      if (promedio < 1){
        jugador.promedioHabilidades = 1;
      
      }else{
        jugador.promedioHabilidades = Math.round(promedio);      
      }
    })
    
    return this.jugadores;    
  }

  generarEquipos(jugador: any){
    let pos = this.jugadoresSeleccionados.indexOf(jugador);
    if (pos === -1){
      this.jugadoresSeleccionados.push(jugador);
    }else{
      this.jugadoresSeleccionados.splice(pos, 1);
    }
    
  }

  getTeams(){
    this.teamOne = [...this.jugadoresSeleccionados].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,this.jugadoresSeleccionados.length/2);
    this.teamTwo = this.jugadoresSeleccionados.filter((jugador: any) => !this.teamOne.includes(jugador));
    
    this.router.navigate(['equipos', this.teamOne, this.teamTwo]);
    // return [this.teamOne, this.teamTwo];
  }
}
