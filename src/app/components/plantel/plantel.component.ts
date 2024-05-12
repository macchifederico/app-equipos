import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plantel',
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.css']
})
export class PlantelComponent {

  // @Input() dataEquipos: any;
  jugadores: any = [];
  teamOne : any = [];
  teamTwo : any = [];
  jugadoresSeleccionados: any = [];  
  seleccionados: any = [];
  id_usuario : number = 0;
  id_jugador : number = 0;
  jugadorABorrar : any = null;

  constructor(private router: Router, private ds: DataService) {
  }

  ngOnInit() {
    this.obtenerJugadoresPorUsuario();
    
  }

  obtenerJugadoresPorUsuario(){
    const id_usuario = 1; //provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {
        this.jugadores = data.players;
        
      },
      error: (error: any) => {
      }
    })
  }

  seleccionarJugadores(jugador: any){
    if(this.jugadoresSeleccionados.includes(jugador)){
      let indice = this.jugadoresSeleccionados.indexOf(jugador);
      this.jugadoresSeleccionados.splice(indice, 1);
    }else{
      this.jugadoresSeleccionados.push(jugador);
    }
    
    return this.jugadoresSeleccionados;      
  }
  

  getTeams(){    
    this.teamOne = [...this.jugadoresSeleccionados].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0,this.jugadoresSeleccionados.length/2);
    this.teamTwo = this.jugadoresSeleccionados.filter((jugador: any) => !this.teamOne.includes(jugador)); 
    
    this.ds.updatePlayersTeamsId(this.teamOne, this.teamTwo).subscribe({
      next: (data: any) => {
      }
    })
    this.router.navigate(['/equipos']);
  }

  borrarJugador(jugador: any){
    this.jugadorABorrar = jugador;
    const id_usuario = this.jugadorABorrar.id_usuario;
    const id_jugador = this.jugadorABorrar.id;

    this.ds.deletePlayer(id_jugador, id_usuario).subscribe({
      next: (data: any) => {
        if(data.data.status == 'OK')
          Swal.fire({
            title: '',
            text: 'Jugador borrado!!',
            icon: 'success',
            // confirmButtonText: 'OK',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            location.reload();
          })        
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
