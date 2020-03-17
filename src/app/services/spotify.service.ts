import { Injectable } from '@angular/core';
// Peticion Http
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Operadores
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Servicio activado.');
   }

   // Centralizar las peticiones al servicio y evitar
   // duplicacion de codigo
   getQuery(query:string){

    let token: string;
    const url = `https://api.spotify.com/v1/${ query }`;

    // Guardamos el Token en el LocalSorage para evitar que caduque
    localStorage.setItem("API token", 'BQAo4WDyyfJM-60jyrzsgSDfJqVi9ICs-ZdBUyOzriU7g82iFjLD6_YEwU9daqEHztWtq4_8hPyGLjZOzhk');
    token = localStorage.getItem("API token");
    // console.log(token);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get( url, {headers});
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
