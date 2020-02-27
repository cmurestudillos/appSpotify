import { Component, OnInit } from '@angular/core';
// Servicio
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  busqueda:string = "";
  artistas:any[] = [];
  loading:boolean;

  constructor( public _spotifyService:SpotifyService ) { }

  ngOnInit() {}

  buscarArtista( busqueda:string ){
    this.loading = true;
    this._spotifyService.getArtistas( this.busqueda )
                        .subscribe((data:any) =>{
                          this.artistas = data;
                          this.loading = false;
                        });
  }


}
