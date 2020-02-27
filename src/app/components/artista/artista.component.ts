import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
// Rutas
import { ActivatedRoute } from '@angular/router'
// Servicios
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})

export class ArtistaComponent implements OnInit {

  artista:any = {};
  loadingArtista:boolean;
  tracks:any[] = [];

  constructor( private activatedRoute: ActivatedRoute, public _spotifyService: SpotifyService ) {
      this.loadingArtista = true;

      this.activatedRoute.params.subscribe(params=>{
        console.log(params['id']);
        this.getArtista(params['id']);
        this.getTopTracks(params['id']);
      });
  }

  ngOnInit() {}

  // Metodo para llamar la peticion del servicio
  getArtista( id: string){
    this.loadingArtista = true;
    this._spotifyService.getArtistaId( id )
                        .subscribe( data => {
                          // console.log(data);
                          this.artista = data;
                          this.loadingArtista = false;
                        });
  }

  // Metodo para llamar la peticion del servicio
  getTopTracks(id:string){
    this._spotifyService.getTopTracks(id)
                        .subscribe( data => {
                          // console.log(data);
                          this.tracks = data;
                        });
  }

}
