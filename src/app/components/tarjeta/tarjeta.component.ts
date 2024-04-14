import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {

  jugadores: any = [];
  promedio: any;
  mejorHabilidad: any;
  peorHabilidad: any;
  unJugador: any;
  radarChartDataArray: ChartData<'radar'>[] = [];

  radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: []
  };

  radarChartLabels: string[] = [ 'Tiro', 'Remate', 'Defensa', 'Velocidad', 'Gambeta', 'Tecnica', 'Rusticidad', 'Temperamento' ];
  
  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 5
      }
    }
  };

  radarChartType: ChartType = 'radar';

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }


  constructor(private router: Router, private ds: DataService) {}

  ngOnInit() {
    this.obtenerJugadoresPorUsuario();    
  }
  
  obtenerJugadoresPorUsuario(){
    const id_usuario = 1; //provisorio
    this.ds.getAllPlayersByUserId(id_usuario).subscribe({
      next: (data: any) => {      
        this.jugadores = data.players;   
        this.radarChartDataArray = this.jugadores.map((jugador: any) => {      
          return {
            labels: ['Tiro', 'Remate', 'Defensa', 'Velocidad', 'Gambeta', 'Tecnica', 'Rusticidad', 'Temperamento'],
            datasets: [{
              data: [jugador.tiro, jugador.remate, jugador.defensa, jugador.velocidad, jugador.gambeta, 
                     jugador.tecnica, jugador.rusticidad, jugador.temperamento],
              label: jugador.nombre
            }]
          };
        });  
      },
      error: (error: any) => {
        console.error('Error al obtener jugadores:', error);
      }
    })
  }

}
