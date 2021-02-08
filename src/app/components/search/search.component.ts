import { Component, OnInit, Output } from '@angular/core';
// Servicio
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _timeWaitSearch: any;
  @Output() artistas: any[] = [];
  // artistas:any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(){
  }

  buscar(valor:string){

    clearTimeout(this._timeWaitSearch);

    this._timeWaitSearch = setTimeout(() => {
      this.loading = true;

      this.spotify.getArtistas(valor)
      .subscribe((data:any) => {
        this.artistas = data;
        this.loading = false;
      },(error) => {
        error.status == 401 || error.status == 400 && (this.spotify.tokenRefreshURL());
      });
    }, 500);
  }

}
