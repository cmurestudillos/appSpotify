import { Component } from '@angular/core';
// Rutas
import { ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
// Servicios
import { SpotifyService } from './services/spotify.service';
import { RouteService} from './services/route.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _activatedRoute: ActivatedRoute, private _location: Location, private _routeService: RouteService, private _router: Router, private _spotify: SpotifyService){
    this._routeService.registerUrls();

    function getHashParams(q) {
      let hashParams = {}, e, r = /([^&;=]+)=?([^&;]*)/g;

      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }
    this._router.events.subscribe(data => {

      if (data instanceof RoutesRecognized) {

        const URL = this._location.path();

        if (URL.split('=')[0] === 'access_token') {

          let param = getHashParams(URL);
          const NewToen = param['access_token'];
          NewToen && (sessionStorage.setItem('token', NewToen), this._spotify.actualizarToken());

        }

      }

    });
  }

}
