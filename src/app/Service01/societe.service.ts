import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  baseUrl = "http://localhost:8080/Societe/"
  constructor(private http: HttpClient) { }

  getListeSociete(){
   return this.http.get(this.baseUrl+'findAll');
  }
  

  addSociete(societe:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.baseUrl+'save',societe,httpOptions);
  }

  deleteSociete(codeFour:any){
      return this.http.delete(this.baseUrl+'delete/'+codeFour);
  }

  modifierSociete(codeFour:any,societe:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.baseUrl+'update/'+codeFour,societe,httpOptions);
}

}




