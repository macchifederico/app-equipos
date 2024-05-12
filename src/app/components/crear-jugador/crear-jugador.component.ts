import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear-jugador.component.html',
  styleUrls: ['./crear-jugador.component.css']
})
export class CrearJugadorComponent {

  jugadorForm: FormGroup = new FormGroup({});

  constructor(private ds: DataService, private fb: FormBuilder, private route: Router) {
    
  }

  ngOnInit(): void {
    this.jugadorForm = this.fb.group({
      nombre: ['', Validators.required],
      apodo: ['', Validators.required],
      posicion1: ['', Validators.required],
      posicion2: ['', Validators.required],
      tiro: ['', Validators.required],
      remate: ['', Validators.required],
      defensa: ['', Validators.required],
      velocidad: ['', Validators.required],
      gambeta: ['', Validators.required],
      fisico: ['', Validators.required],
      tecnica: ['', Validators.required],
      rusticidad: ['', Validators.required],
      temperamento: ['', Validators.required],
      lesiones: ['', Validators.required],
      img_url: ['']
    })

  }

  crearJugador(jugadorForm: FormGroup){    
    let id_usuario = 1; //provisorio
    if(this.jugadorForm?.valid){
      this.ds.createPlayer(jugadorForm, id_usuario).subscribe({
        next: (data) => {
          Swal.fire({
            title: '',
            text: 'Jugador creado!!',
            icon: 'success',
            showConfirmButton: false,
            // confirmButtonText: 'OK',
            timer: 2000
          })
          this.route.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
