import { Injectable } from '@angular/core';
// Peticion Http
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Operadores
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  public credentials = {
    clientId: '8d45acfbba4b44c691c35ed84c86ca71',
    clientSecret: '57b462d36baf45eca05d2de18e098cfc',
    accessToken: ''
  };

  public poolURlS = {
    authorize: 'https://accounts.spotify.com/es-ES/authorize?client_id=' +
      this.credentials.clientId + '&response_type=token' +
      '&redirect_uri=' + encodeURIComponent('https://appspotify.cmurestudillos.es') +
      '&expires_in=3600',
    refreshaAcessToken: 'https://accounts.spotify.com/api/token'
  };

  constructor( private http: HttpClient) {
    console.log('Servicio activado.');
    this.actualizarToken();
  }

  actualizarToken(){
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }


   // Centralizar las peticiones al servicio y evitar
   // duplicacion de codigo
  getQuery(query:string){
  const url = `https://api.spotify.com/v1/${ query }`;
  const header = {
    headers: new HttpHeaders(
      {'Authorization': 'Bearer ' + this.credentials.accessToken
    })
  };

  return this.http.get( url, header);
  }

  checkTokenSpoLogin() {
    this.checkTokenSpo() || (sessionStorage.setItem('refererURL', location.href), window.location.href = this.poolURlS.authorize);
  }

  checkTokenSpo() {
    return !!this.credentials.accessToken;
  }

  tokenRefreshURL() {
    this.checkTokenSpo() && alert('Expiro la sesión');

    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();
  }

  // Obtenemos los ultimos lanzamientos
  getNewReleases(){
  return this.getQuery(`browse/new-releases?country=ES&limit=20`)
              .pipe( map( (data:any) => {
                  return data['albums'].items;
              }));
  }

  // Obtenemos toda la informacion acerca de la palabra que pongamos en el buscador
  getArtistas( valor : string){
    return this.getQuery(`search?q=${valor}&type=artist&limit=20`)
                .pipe( map( (data:any) => {
                    return data['artists'].items;
                }));
    }

  // Obtenemos toda la informacion acerca del artista seleccionado
  getArtista( id : string){
    return this.getQuery(`artists/${id}`);
    }

  // Obtenemos toda la informacion acerca del artista seleccionado
  getTopTracks( id : string){
    return this.getQuery(`artists/${id}/top-tracks?country=ES `)
                .pipe( map( (data:any) => {
                  return data['tracks'];
              }));
    }
}
