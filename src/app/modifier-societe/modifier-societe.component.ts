import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ArticleService} from '../Service01/article.service';
import { LigneCommandeService } from '../Service01/ligne-commande.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FournisseurService } from '../Service01/fournisseur.service';
import { SocieteService } from '../Service01/societe.service';


export interface Fournisseur{
  codeFour:number|null,
}
export interface listeSociete {
  nomSte: string,
  faxSte: string,
  telSte: string,
  villeSte: string,
  fournisseur:Fournisseur|null
}

@Component({
  selector: 'app-modifier-societe',
  templateUrl: './modifier-societe.component.html',
  styleUrls: ['./modifier-societe.component.css']
})
export class ModifierSocieteComponent implements OnInit {
  codeFour:any
  listeFournisseur: any[] = [];
  modelFournisseur:Fournisseur={
    codeFour:null,
  }

  model:listeSociete={
    nomSte: '',
    faxSte: '',
    telSte: '',
    villeSte: '',
    fournisseur:null
  }
  nomFour:any;
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private fournisseurService:FournisseurService,private societeService: SocieteService) { 

    this.modelFournisseur.codeFour=element.element.fournisseur.codeFour;
    this.nomFour=element.element.fournisseur.nomFour;
    this.model.fournisseur=this.modelFournisseur;
    this.model.nomSte=element.element.nomSte;
    this.model.faxSte=element.element.faxSte;
    this.model.telSte=element.element.telSte;
    this.model.villeSte=element.element.villeSte;
    this.listeFournisseurs()

  }
  listeFournisseurs(){
    this.fournisseurService.getListeFournisseur().subscribe((fournisseurs:any)=>{
      for(let i=0; i<fournisseurs.length; i++){
        this.listeFournisseur.push(fournisseurs[i])
      }       
    })
  }
  
  ngOnInit(): void {
  }

  updateSociete(){
    if(this.model.faxSte!=null && this.model.telSte!=null &&  this.model.villeSte!=null && this.model.fournisseur!=null ){
      this.model.fournisseur=this.modelFournisseur;
      this.societeService.modifierSociete(this.model.nomSte,this.model).subscribe(res=>{
       console.log(res);
       // this.ListeLocation()
       this._snackBar.open('Societe '+this.model.nomSte+' Modifier ', 'OK', {
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
      this.modelFournisseur.codeFour=item
  }

}
