import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }
  getArticles(){
    return this.http.get('http://localhost:8080/Article/findAll');
  }

  getArticlesLigneCmd(){
    return this.http.get('http://localhost:8080/LigneCmd/articles');
  }

  getArticlesLigneLivraison(){
    return this.http.get('http://localhost:8080/LigneLivraison/articles');
  }

  addArticle(element:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('http://localhost:8080/Article/save',element,httpOptions);
  }

  deleteArticle(code:any){
    return this.http.delete('http://localhost:8080/Article/delete/'+code);
}
modifierArticle(code:any,data:any){
  const httpOptions2 = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.put('http://localhost:8080/Article/update/'+code,data,httpOptions2);
}
}
