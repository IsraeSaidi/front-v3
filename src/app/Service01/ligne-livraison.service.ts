import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LigneLivraisonService {

  baseUrl = "http://localhost:8080/LigneLivraison/";
  constructor(private http: HttpClient) { }
  addLigneLivraison(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.baseUrl+'save',element,httpOptions);
  }

  deleteLigneLivraison(codeArticle:any){
    return this.http.delete(this.baseUrl+'delete/'+codeArticle);
  }

 
}
