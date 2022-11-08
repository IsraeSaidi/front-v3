import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ArticleService} from '../Service01/article.service';
import { LigneCommandeService } from '../Service01/ligne-commande.service';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface Commande{
  numCmd: number|null,
}

export interface Article{
  codeArticle:number|null,
}
export interface listeLigneCommande {
  numLigne: number|null,
  qteCmd: number|null,
  commande:Commande|null,
  article:Article|null
}

@Component({
  selector: 'app-modifier-ligne-commande',
  templateUrl: './modifier-ligne-commande.component.html',
  styleUrls: ['./modifier-ligne-commande.component.css']
})
export class ModifierLigneCommandeComponent implements OnInit {
  codeArticlePrec:any
  listeArticle: any[] = [];
  modelArticle:Article={
    codeArticle:null,
  }

  modelCommande:Commande={
    numCmd:null,
  }
  model:listeLigneCommande={
    numLigne: null,
    qteCmd: null,
    commande:null,
    article:null
  }
  nomArticle:any;
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private articleService:ArticleService,private ligneCommandeService:LigneCommandeService) { 
    this.modelCommande.numCmd=element.codeCmd
    this.model.commande=this.modelCommande
    this.modelArticle.codeArticle=element.element.article.codeArticle;
    this.nomArticle=element.element.article.nomArt;
    this.model.article=this.modelArticle;
    this.model.qteCmd=element.element.qteCmd;
    this.model.numLigne=element.element.numLigne;
    this.ListeArticles()

  }
  ListeArticles(){
    this.articleService.getArticlesLigneCmd().subscribe((articles:any)=>{
      for(let i=0; i<articles.length; i++){
        this.listeArticle.push(articles[i])
      }       
    })
  }
  ngOnInit(): void {
  }

  UpdateLigneCommande(){
    if(this.model.qteCmd!=null && this.model.article!=null ){
      this.model.article=this.modelArticle;
      this.ligneCommandeService.updateLigneCommande(this.model.numLigne,this.model).subscribe(res=>{
       console.log(res);
       // this.ListeLocation()
       this._snackBar.open('Ligne '+this.model.numLigne+' Modifier ', 'OK', {
         horizontalPosition: 'center',
         verticalPosition: 'top',
       });
      });
     }else{
       this._snackBar.open('remplir tous les champs , svp !!', 'OK', {
         horizontalPosition: 'center',
         verticalPosition: 'top',
       });      
     }
  }

  selectItem(item?: any)
  {
      this.modelArticle.codeArticle=item
  }

}
