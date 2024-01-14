import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  //Declaramos y creamos el array de noticias vacío
  listaNoticias: Article[] = [];
  //Declaramos la categoria para que cuando se cambie de categoria lo podamos cambiar
  categoria: string = "business";
  /*
   * Creamos un objeto {} Observable que estará vacío y será del tipo Observable<RespuestaNoticias>. En este caso estamos creando un objeto vacío no será null.
   *
   * Otra manera de hacer esto sería utilizar | null = null, de esta manera decimos que el objeto respuestaNoticiasObservable de tipo Observable<RespuestaNoticias>
   * puede ser null y lo inicializamos null.
   * 
   * Crearlo como global puede ser útil si utilizamos el observable en varios métodos.
  */
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> | null = null;

  //Añadimos HttpClient y el servicio en el constructor
  constructor(private leerArticulosRESTHttp: HttpClient, public gestionNoticiasLeerService: GestionNoticiasLeerService) {
    //Incluso podríamos crear la llamada en el constructor si fuese necesario
    //this.respNoticiasObservable = this.leerArticulosFicheroHttp.get<RespuestaNoticias>("/assets/datos/articulos.json");
    this.leerArticulosFichero();
  }

  private leerArticulosFichero(){
    //Hacemos uso de la función get de HttpClient para leer el REST diciendo que será de tipo RespuestaNoticias y la guardamos
    let respNoticiasObservable: Observable<RespuestaNoticias> = this.leerArticulosRESTHttp.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category=" + this.categoria + "&apiKey=ae8978b5bf534f2ea1d776aed238e91a");
    
    respNoticiasObservable.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(...resp.articles);
    });
    console.log(this.categoria);
  }

  // Comprueba si la noticia seleccionada (checked) está para leer o no
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeerService.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false; 
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia del array
  checkNoticia(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeerService.addNoticias(item);
    } else {
      this.gestionNoticiasLeerService.borrarNoticia(item);
    }    
  }
  // Cambia de categoria cuando se pulsa los ion-segment
  cambiarCategoria(ev: any) {
    
    if (ev.detail.value == "business"){
      this.categoria = "business";
      console.log("ddd");
    }
    if (ev.detail.value == "entertainment"){
      this.categoria = "entertainment";
    }
    if (ev.detail.value == "general"){
      this.categoria = "general";
    }
    if (ev.detail.value == "health"){
      this.categoria = "health";
    }
    if (ev.detail.value == "science"){
      this.categoria = "science";
    }
    if (ev.detail.value == "sports"){
      this.categoria = "sports";
    }
    if (ev.detail.value == "technology"){
      this.categoria = "technology";
    }
    this.listaNoticias = [];
    this.leerArticulosFichero();

  }
}
