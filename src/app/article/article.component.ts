import { ArticleService } from './../Service01/article.service';
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import { FormControl, Validators,FormBuilder,FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { ModifierArticleComponent } from '../modifier-article/modifier-article.component';

export interface listeArticle {
  codeArticle: number|null,
  nomArt: string,
  pu: number|null,
  qteStock: number|null,
}
let ELEMENT_DATA: listeArticle[] = [
];
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild('codeArticleInput') codeArticleElement!: ElementRef<HTMLInputElement>;
  @ViewChild('nomArtInput') nomArtElement!: ElementRef<HTMLInputElement>;
  @ViewChild('puInput') puElement!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['codeArticle','nomArt','pu','qteStock','Action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  String:any
  ArrayArticle :any;
  ArrayArticles:any[]=[];
  selected:any
  model:listeArticle={
    codeArticle: null,
    nomArt: '',
    pu: null,
    qteStock: null,
  }

  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder:FormBuilder,private articleService: ArticleService) { 
    this.ListeAricles()
  }

  ngOnInit(): void {
  }

  ListeAricles(){
    this.ArrayArticles = []
    this.articleService.getArticles().subscribe((articles: any) => {
      for(let i=0; i<articles.length; i++){
        this.ArrayArticles.push(articles[i])
        
    }
    console.log(this.ArrayArticles)
      // myArray = this.myString.split(',');
      ELEMENT_DATA = this.ArrayArticles;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }

  AddArticle(){
    if(this.model.codeArticle!=null && this.model.nomArt!="" &&this.model.pu!=null){
      
      this.articleService.addArticle(this.model).subscribe(res=>{
       console.log(res);
       this.codeArticleElement.nativeElement.value=""
       this.nomArtElement.nativeElement.value=""
       this.puElement.nativeElement.value=""
       
       this.ListeAricles()
       // this.ListeLocation()
       this._snackBar.open('Article ajoute ', 'OK', {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updateArticle(element:any){
    let dialogRef=this.dialog.open( ModifierArticleComponent, {
      data: {element: element},
    });
    dialogRef.afterClosed().subscribe(() => { this.ListeAricles(); } );
  }

  deleteArticle(code:any){
    this.articleService.deleteArticle(code).subscribe(res=>{

      this.ListeAricles();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('article '+code+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }


}
