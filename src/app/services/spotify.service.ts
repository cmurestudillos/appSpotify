import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  artistas:any [] = [];

  urlArtista:string = "https://api.spotify.com/v1/artists";

  constructor( private http: HttpClient ) { }

  // Metodo para centralizar las busquedas de las distintas peticiones
  getQuery( query:string ){
    const url =`https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer "Tu_Token"'
    });

    return this.http.get(url, {headers} );

  }

  // Metodo para mostrar los ultimos lanzamientos
  getNuevosLanzamientos(){

    // Peticion Http
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map(data => {
                      return data['albums'].items;
                    }) );
  }

  // Metodo para la busqueda de Artistas
  getArtistas( busqueda:string ){

    // Peticion Http
    return this.getQuery(`search?q=${ busqueda }&type=artist&limit=20`)
                    .pipe( map( data => {
                      return data['artists'].items;
                    }) );
  }

  // Metodo para obtener el artista seleccionado por Id
  getArtistaId( id:string ){

        // Peticion Http
        return this.getQuery(`artist/${ id }`);
        //             .pipe( map( data => {
        //             return data['artists'].items;
        // }) );
  }

  // Metodo para obtener las canciones Top
  getTopTracks( id:string ){

      // Peticion Http
      return this.getQuery(`artist/${ id }/top-tracks?country=us`)
                  .pipe( map( data => {
                    return data['tracks'];
        }) );
  }

}
