import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }
  addCommand(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('http://localhost:8080/Commande/save',element,httpOptions);
  }

  deleteCommande(code:any){
    return this.http.delete('http://localhost:8080/Commande/delete/'+code);
  }

  getLigneCommande(code:any){
    return this.http.get('http://localhost:8080/Commande/getLigneCommandes/'+code);
  }
}
