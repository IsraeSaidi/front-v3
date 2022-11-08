import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators,FormBuilder,FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { CommandeService } from '../Service01/commande.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ArticleService} from '../Service01/article.service';
import { LigneCommandeService } from '../Service01/ligne-commande.service';
import { ModifierLigneCommandeComponent } from '../modifier-ligne-commande/modifier-ligne-commande.component';

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
let ELEMENT_DATA: listeLigneCommande[] = [
];
@Component({
  selector: 'app-ligne-commande',
  templateUrl: './ligne-commande.component.html',
  styleUrls: ['./ligne-commande.component.css']
})
export class LigneCommandeComponent implements OnInit {
  @ViewChild('numInput') numInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('qteInput') qteInputElement!: ElementRef<HTMLInputElement>;
  selectedValue: any;
 
  None:any;
  listeArticle: any[] = [];
  ArrayClients:any[]=[];
  displayedColumns: string[] = ['numLigne','qteCmd','article','action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  codeCmd:any;
  modelArticle:Article={
    codeArticle:null,
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  constructor(@Inject(MAT_DIALOG_DATA) public element: any,private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder:FormBuilder,private commandeService: CommandeService,private articleService:ArticleService,private ligneCommandeService:LigneCommandeService) { 
    this.codeCmd=element.codeCommande
    this.modelCommande.numCmd=element.codeCommande
    this.ListeLigneCommandes()
    this.ListeArticles()
    console.log(this.numInputElement);
  }
  ListeArticles(){
    this.articleService.getArticlesLigneCmd().subscribe((articles:any)=>{
      for(let i=0; i<articles.length; i++){
        this.listeArticle.push(articles[i])
      }       
    })
  }
  ListeLigneCommandes(){
    this.ArrayClients = []
    this.commandeService.getLigneCommande(this.codeCmd).subscribe((clients: any) => {
      for(let i=0; i<clients.length; i++){
        this.ArrayClients.push(clients[i])
      }
    console.log(this.ArrayClients)
      
      ELEMENT_DATA = this.ArrayClients;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }
  ngOnInit(): void {
  }


   deleteLigneCommande(code:any){
    this.ligneCommandeService.deleteLigneCommande(code).subscribe(res=>{

      this.ListeLigneCommandes();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('ligne '+code+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
   }
   updateLigneCommande(element:any){
    let dialogRef=this.dialog.open( ModifierLigneCommandeComponent, {
      data: {element: element,codeCmd:this.codeCmd},
    });
    dialogRef.afterClosed().subscribe(() => { this.ListeLigneCommandes(); } );
   }
  AddLigneCommande(){
     if(this.model.numLigne!=null && this.model.qteCmd!=null &&this.modelArticle.codeArticle!=null){
      this.model.commande=this.modelCommande;
      this.model.article=this.modelArticle;
       this.ligneCommandeService.addLigneCommande(this.model).subscribe(res=>{
        console.log(res);
        this.numInputElement.nativeElement.value=""
        this.qteInputElement.nativeElement.value=""
        this.selectItem(null)
        this.ListeLigneCommandes()
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
      this.modelArticle.codeArticle=item
  }
}
