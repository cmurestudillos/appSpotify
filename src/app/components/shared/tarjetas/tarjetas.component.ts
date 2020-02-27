import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() items:any[] = [];

  constructor( private router: Router) { }

  ngOnInit(){
  }

  // Metodo para visualizar artista sea desde Componente Home o Search
  verArtista(item:any){
    let artistaId;

    if(item.type === 'artist'){
      artistaId = item.id;
    }else{
      artistaId = item.artists[0].id;
    }
    this.router.navigate(['/artista', artistaId]);
  }

}
