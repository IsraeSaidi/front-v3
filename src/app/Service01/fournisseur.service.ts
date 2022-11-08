import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  baseUrl = "http://localhost:8080/Fournisseur/";
  constructor(private http: HttpClient) { }

  getListeFournisseur(){
   return this.http.get(this.baseUrl+'findAll');
  }

  addFournisseur(fournisseur:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.baseUrl+'save',fournisseur,httpOptions);
  }

  deleteFournisseur(codeFour:any){
      return this.http.delete(this.baseUrl+'delete/'+codeFour);
  }

  modifierFournisseur(codeFour:any,newFour:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.baseUrl+'update/'+codeFour,newFour,httpOptions);
}

getLivraisons(){
  return this.http.get(this.baseUrl+'findLivraisons');
}
}