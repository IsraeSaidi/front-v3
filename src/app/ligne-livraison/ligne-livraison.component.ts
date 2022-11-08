import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ArticleService} from '../Service01/article.service';
import { LivraisonService } from '../Service01/livraison.service';
import { LigneLivraisonService } from '../Service01/ligne-livraison.service';

export interface Livraison{
  numLiv: number|null,
}


export interface listeLigneLivraison {
  codeArticle:number|null
  qteLiv: number|null,
  livraison:Livraison|null,
  
}
let ELEMENT_DATA: listeLigneLivraison[] = [
];
@Component({
  selector: 'app-ligne-livraison',
  templateUrl: './ligne-livraison.component.html',
  styleUrls: ['./ligne-livraison.component.css']
})
export class LigneLivraisonComponent implements OnInit {

  @ViewChild('qteInput') qteInputElement!: ElementRef<HTMLInputElement>;
  selectedValue: any;
 
  None:any;
  listeArticle: any[] = [];
  array:any[]=[];
  displayedColumns: string[] = ['article','qteLiv','action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  numLiv:any;
  codeArticle!: number | null;
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  modelLivraison:Livraison={
    numLiv:null,
  }
  model:listeLigneLivraison={
    codeArticle:null,
    qteLiv: null,
    livraison:null,
    
  }
  constructor(@Inject(MAT_DIALOG_DATA) public element: any,private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder:FormBuilder,private livraisonService: LivraisonService,private articleService:ArticleService,private ligneLivraisonService:LigneLivraisonService) { 
    this.numLiv=element.numLiv
    this.modelLivraison.numLiv=element.numLiv
    this.ListeLigneLivraisons()
    this.ListeArticles()
    
  }
  ListeArticles(){
    this.articleService.getArticles().subscribe((articles:any)=>{
      for(let i=0; i<articles.length; i++){
        this.listeArticle.push(articles[i])
      }       
    })
  }
  ListeLigneLivraisons(){
    this.array = []
    this.livraisonService.getLigneLivraison(this.numLiv).subscribe((livraisons: any) => {
      for(let i=0; i<livraisons.length; i++){
        this.array.push(livraisons[i])
      }
    console.log(this.array)
      
      ELEMENT_DATA = this.array;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }
  ngOnInit(): void {
  }


   deleteLigneLivraison(code:any){
    this.ligneLivraisonService.deleteLigneLivraison(code).subscribe(res=>{

      this.ListeLigneLivraisons();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('ligne '+code+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
   }
  
  AddLigneLiv(){
     if(this.model.qteLiv!=null &&this.codeArticle!=null){
      this.model.livraison=this.modelLivraison;
      this.model.codeArticle=this.codeArticle;
      console.log(this.model);
       this.ligneLivraisonService.addLigneLivraison(this.model).subscribe(res=>{
        console.log("hhh"+res);
   
        this.qteInputElement.nativeElement.value=""
        this.selectItem(null)
        this.ListeLigneLivraisons()
        this.listeArticle=[]
        this.ListeArticles()

        this._snackBar.open('Ligne ajoute ', 'OK', {
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
      this.codeArticle=item
  }
}
