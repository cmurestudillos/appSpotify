import { Component, OnInit, Output } from '@angular/core';
// Servicio
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() nuevosLanzamientos: any[] = [];
  // nuevosLanzamientos: any[] = [];
  loading:boolean;
  error: boolean;
  mensajeError: string;

  constructor( private _spotify: SpotifyService) {
    if (this._spotify.checkTokenSpo()) {
      this.loading = true;
      this.error = false;

      this._spotify.getNewReleases()
      .subscribe( (data:any) => {
        this.nuevosLanzamientos = data;
        this.loading = false;
      }, (errorService) => {
        // this.error = true;
        // this.loading = false;
        // this.mensajeError = errorService.error.error.message;
        errorService.status == 401 && (this._spotify.tokenRefreshURL());
      });
    }
  }

  ngOnInit() {
  }

}
