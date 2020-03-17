import { Component, OnInit } from '@angular/core';
// Servicio
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas:any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(){
  }

  buscar(valor:string){
    this.loading = true;
    this.spotify.getArtistas(valor)
                .subscribe((data:any) => {
                  this.artistas = data;
                  this.loading = false;
                });
  }

}
