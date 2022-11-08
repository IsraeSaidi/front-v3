import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ArticleService } from '../Service01/article.service';
export interface listeArticle {
  codeArticle: number|null,
  nomArt: string,
  pu: number|null,
  qteStock: number|null,
}
@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent implements OnInit {
  model:listeArticle={
    codeArticle: null,
    nomArt: '',
    pu: null,
    qteStock: null,
  }
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private articleService:ArticleService) { 
    this.model.codeArticle=element.element.codeArticle
    this.model.nomArt=element.element.nomArt
    this.model.pu=element.element.pu
 
  }

  ngOnInit(): void {
  }

  UpdateArticle(){
    if(this.model.codeArticle!=null && this.model.nomArt!="" &&this.model.pu!=null&&this.model.qteStock!=null){
      
      this.articleService.modifierArticle(this.model.codeArticle,this.model).subscribe(res=>{
       console.log(res);
       // this.ListeLocation()
       this._snackBar.open('Article'+this.model.codeArticle+' Modifier ', 'OK', {
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

}
