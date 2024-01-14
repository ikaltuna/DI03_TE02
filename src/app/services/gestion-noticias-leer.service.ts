import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private leerNoticias : Article[] = [];
  //Se añade en el constructor el servicio de almacenamiento para que se utilize el la gestion de noticias
  constructor(private gestionNoticias: GestionStorageService) {
    let noticiasPromesa: Promise<Article[]> = gestionNoticias.getObject("leerNoticias");

    noticiasPromesa.then( datos =>{
      this.leerNoticias.push(...datos);
    });
   }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.leerNoticias;
  }

  //Añade una nueva noticia al array para poder leer
  addNoticias(noticia : Article){
    let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);

    this.leerNoticias.push(noticia);
    //Se añade para que se almacene en storage service
    this.gestionNoticias.setObject("leerNoticias", this.leerNoticias);
  }

  /* Comprueba si una noticia ya está en el array.
   * Mediante find vamos recorriendo todo el array hasta encontrar un objeto noticia que coincida con el objeto item que viene desde tab1.page.ts -> seleccionado()
   */
  buscarNoticia(item: Article): number  {
    let articuloEncontrado: any = this.leerNoticias.find(
      function(noticia) { 
        return JSON.stringify(noticia) == JSON.stringify(item);
      }
    );
    let indice = this.leerNoticias.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia del array
  borrarNoticia(item: Article) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.leerNoticias.splice(indice, 1);
    }
    //Se añade para que se almacene en storage service
    this.gestionNoticias.setObject("leerNoticias", this.leerNoticias);
  }

}
