import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
 

  baseUrl = "http://localhost:8080/Livraison/";
  constructor(private http: HttpClient) { }
  addLivraison(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.baseUrl+'save',element,httpOptions);
  }

  deleteLivraison(code:any){
    return this.http.delete(this.baseUrl+'delete/'+code);
  }

  getLivraison(){
    return this.http.get(this.baseUrl+'findAll/');
  }

  getLigneLivraison(code:any){
    return this.http.get('http://localhost:8080/Livraison/getLigneLivraisons/'+code);
  }
}
