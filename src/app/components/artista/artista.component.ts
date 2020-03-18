import { Component, OnInit } from '@angular/core';
 // Ruta Activa
import { ActivatedRoute, Router } from '@angular/router';
// Servicio
import { SpotifyService } from '../../services/spotify.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista:any = {};
  topTracks:any = {};
  loading: boolean;

  constructor(private _router: Router, private route: ActivatedRoute, private _spotify: SpotifyService, private _routeService: RouteService,) {
    this.loading = true;
    this.route.params.subscribe( params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  ngOnInit() {
  }

  btnVolver(){
    this._router.navigate([this._routeService.previousUrl]);
  }

  // Metodo para obtener la informacion del artista seleccionado
  // y no sobrecargar el constructor
  getArtista(id :string){
    this.loading = true;
    this._spotify.getArtista(id)
                  .subscribe(data => {
                    // console.log(data);
                    this.artista = data;
                    this.loading = false;
                  });
  }

  // Metodo para obtener la informacion de las canciones del artista seleccionado
  getTopTracks(id :string){
    this.loading = true;
    this._spotify.getTopTracks(id)
                  .subscribe(data => {
                    this.topTracks = data;
                    this.loading = false;
                  });
  }

}
