import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

API_URL= "http://localhost:3000/api/jugadores";  
//  API_URL= "https://192.168.0.42:3000/api/jugadores";
//API_URL= "http://app-equipos.ddns.net:3000/api/jugadores";  
 
  constructor(private http: HttpClient) { }

  getAllPlayersByUserId(id_usuario: number): Observable<any>{    
    const body = {'id_usuario': id_usuario}
    return this.http.post<any>(`${this.API_URL}`, body);
  }

  updatePlayersTeamsId(teamOne: any, teamTwo: any): Observable<any>{
    const body = {
      'teamOne': teamOne,
      'teamTwo': teamTwo
    }
    return this.http.post<any>(`${this.API_URL}/update`, body);
  }

  getTeamsByUserId(id_usuario: number): Observable<any>{
    const body = {'id_usuario': id_usuario}
    return this.http.post<any>(`${this.API_URL}/teams`, body);
  }

  createPlayer(jugador: any, id_usuario: number): Observable<any>{    
    const body = {
      "jugador":{
        "id_usuario":   id_usuario,
        "id_equipo":    null,
        "nombre":       jugador.value.nombre,
        "apodo":        jugador.value.apodo,
        "posicion_1":   jugador.value.posicion1,
        "posicion_2":   jugador.value.posicion2,
        "img_url":      jugador.value.img_url,
        "habilidades":{
            "tiro":           Number(jugador.value.tiro),
            "remate":         Number(jugador.value.remate),
            "defensa":        Number(jugador.value.defensa),
            "velocidad":      Number(jugador.value.velocidad),
            "gambeta":        Number(jugador.value.gambeta),
            "estado_fisico":  Number(jugador.value.fisico),
            "tecnica":        Number(jugador.value.tecnica),
            "rusticidad":     Number(jugador.value.rusticidad),
            "temperamento":   Number(jugador.value.temperamento),
            "prop_lesiones":  Number(jugador.value.lesiones)
        },
        "promedioHabilidades": 0
      }
    }
    return this.http.post<any>(`${this.API_URL}/create`, body);
  
  }

  deletePlayer(id_jugador: number, id_usuario: number): Observable<any>{
    const body = {
      "id_jugador": id_jugador,
      "id_usuario": id_usuario
    }
    return this.http.post<any>(`${this.API_URL}/delete`, body);
  }
}
