import { Component, OnInit, Input } from '@angular/core';
// Rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  // Nos traemos los datos del HomeComponent
  @Input() items:any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  verArtista(item:any){
    let artistaId;

    if(item.type === 'artist'){
      artistaId = item.id;
    }else{
      artistaId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistaId]);
  }

}
