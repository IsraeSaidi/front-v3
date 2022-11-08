import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {

  constructor(private http: HttpClient) { }
  addLigneCommande(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('http://localhost:8080/LigneCmd/save',element,httpOptions);
  }

  deleteLigneCommande(code:any){
    return this.http.delete('http://localhost:8080/LigneCmd/delete/'+code);
  }

  updateLigneCommande(code:any,data:any){
      const httpOptions2 = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put('http://localhost:8080/LigneCmd/update/'+code,data,httpOptions2);
  }
}
