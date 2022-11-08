import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getListeClient(){
   return this.http.get('http://localhost:8080/Client/findAll');
  }
  

  addClient(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('http://localhost:8080/Client/save',element,httpOptions);
  }

  deleteClient(code:any){
      return this.http.delete('http://localhost:8080/Client/delete/'+code);
  }

  modifierClient(code:any,data:any){
    const httpOptions2 = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put('http://localhost:8080/Client/update/'+code,data,httpOptions2);
}
  getCommandes(){
    return this.http.get('http://localhost:8080/Client/findAll2');
  }
}
