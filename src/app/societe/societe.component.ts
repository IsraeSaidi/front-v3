
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators,FormBuilder,FormGroup } from '@angular/forms';


import { ModifierFournisseurComponent } from '../modifier-fournisseur/modifier-fournisseur.component';
import { SocieteService } from '../Service01/societe.service';
import { ModifierSocieteComponent } from '../modifier-societe/modifier-societe.component';
import { FournisseurService } from '../Service01/fournisseur.service';


export interface Fournisseur{
  codeFour:number|null,
} 

export interface listeSociete {
  nomSte: string,
  faxSte: string,
  telSte: string,
  villeSte: string,
  fournisseur: Fournisseur|null


  
  
}
let ELEMENT_DATA: listeSociete[] = [
];
@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {
  @ViewChild('inputNomSte') inputNomSte!: ElementRef<HTMLInputElement>;
  @ViewChild('inputFaxSte') inputFaxSte!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTelSte') inputTelSte!: ElementRef<HTMLInputElement>;
  @ViewChild('inputVilleSte') inputVilleSte!: ElementRef<HTMLInputElement>;
  @ViewChild('inputFournisseur') inputFournisseur!: ElementRef<HTMLInputElement>;



  displayedColumns: string[] = ['nomSte','faxSte','telSte','villeSte','codeFour','Action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  String:any
  Arrayfournisseur :any;
  ArraySocietes:any[]=[];
  selected:any
  modelFournisseur:Fournisseur={
    codeFour:null,
  }
  model:listeSociete={
    nomSte: '',
    faxSte: '',
    telSte:'',
    villeSte:'',
    fournisseur:null,
  }
  listeFournisseur:  any[] = [];
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private fournisseurService: FournisseurService,private societeService: SocieteService) {
    this.listeSocietes()


    this.ListeFournisseurs()
    console.log(this.inputFournisseur);

    
    
   }

   deleteSociete(nomSte:any){
    this.societeService.deleteSociete(nomSte).subscribe(res=>{

      this.listeSocietes();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('La societe '+nomSte+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
   }
   updateSociete(societe:any){
    let dialogRef=this.dialog.open( ModifierSocieteComponent , {
      data: {element: societe},
    });
    dialogRef.afterClosed().subscribe(() => { this.listeSocietes(); } );
   }

   ListeFournisseurs(){
    this.fournisseurService.getListeFournisseur().subscribe((fournisseurs:any)=>{
      for(let i=0; i<fournisseurs.length; i++){
        this.listeFournisseur.push(fournisseurs[i])
      }       
    })
  }
  
   addSociete(){
    if(this.model.nomSte!=null && this.model.faxSte!=null && this.model.telSte!=null && this.model.villeSte!=null &&this.modelFournisseur.codeFour!=null){

     this.model.fournisseur=this.modelFournisseur;
      this.societeService.addSociete(this.model).subscribe(res=>{
       console.log(res);
     
       this.inputNomSte.nativeElement.value=""
       this.inputFaxSte.nativeElement.value=""
       this.inputTelSte.nativeElement.value=""
       this.inputVilleSte.nativeElement.value=""
       this.selectItem(null)
       this.listeSocietes()
       this.listeFournisseur=[]
      
       this.ListeFournisseurs()

       this._snackBar.open('Societe ajoute ', 'OK', {
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
   
  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listeSocietes(){
    this.ArraySocietes = []
    this.societeService.getListeSociete().subscribe((societes: any) => {
      for(let i=0; i<societes.length; i++){
        this.ArraySocietes.push(societes[i])
        
    }
    console.log(this.ArraySocietes)
      // myArray = this.myString.split(',');
      ELEMENT_DATA = this.ArraySocietes;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }

  
  

}
