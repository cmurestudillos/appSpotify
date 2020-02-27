import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  canciones:any[] = [];
  loading:boolean;
  error:boolean;
  mensajeError:string;

  constructor( private _spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;

    this._spotifyService.getNuevosLanzamientos()
        .subscribe((data:any) => {
          this.canciones = data;
          this.loading = false;
        }, (errorServicio)=>{

          this.loading = false;
          this.error = true;
          // console.log(errSrv);
          this.mensajeError = errorServicio.error.error.message;
        });
  }

}
