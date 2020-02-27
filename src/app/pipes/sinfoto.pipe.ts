import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(images: any[]): string {

    // variable que contiene imagen no existente
    let noimage = "assets/img/noimage.png";

    // sino tiene imagen, devolvemos la imagen estandar "noimage"
    if( !images ){
      return noimage;
    }

    if( images.length > 0 ){
      return images[0].url;
    }else{
      return noimage;
    }
  }

}
