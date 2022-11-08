
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators,FormBuilder,FormGroup } from '@angular/forms';
import { FournisseurService } from '../Service01/fournisseur.service';
import { AjouterCommandeComponent } from '../ajouter-commande/ajouter-commande.component';
import { ModifierFournisseurComponent } from '../modifier-fournisseur/modifier-fournisseur.component';
import { AddLivraisonComponent } from '../add-livraison/add-livraison.component';
export interface listefournisseur {
  codeFour: number|null,
  nomFour: string,
  telFour: string,
  villeFour: string,
  
}
let ELEMENT_DATA: listefournisseur[] = [
];
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  @ViewChild('inputCodeFour') inputCodeFour!: ElementRef<HTMLInputElement>;
  @ViewChild('inputNomFour') inputNomFour!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTelFour') inputTelFour!: ElementRef<HTMLInputElement>;
  @ViewChild('inputVilleFour') inputVilleFour!: ElementRef<HTMLInputElement>;

  displayedColumns: string[] = ['codeFour','nomFour','telFour','villeFour','Action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  String:any
  Arrayfournisseur :any;
  Arrayfournisseurs:any[]=[];
  selected:any
  model:listefournisseur={
    codeFour:null,
    nomFour:'',
    telFour:'',
    villeFour:''
   
  }
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder:FormBuilder,private fournisseurService: FournisseurService) {
    this.listeFournisseurs()

    
    
   }

   deleteFournisseur(code:any){
    this.fournisseurService.deleteFournisseur(code).subscribe(res=>{

      this.listeFournisseurs();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('fournisseur '+code+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
   }
   updateFournisseur(element:any){
    let dialogRef=this.dialog.open( ModifierFournisseurComponent , {
      data: {element: element},
    });
    dialogRef.afterClosed().subscribe(() => { this.listeFournisseurs(); } );
   }
  
  addFournisseur(){
    if(this.model.codeFour!=null && this.model.nomFour!="" &&this.model.telFour!=""&&this.model.villeFour!=""){
      
       this.fournisseurService.addFournisseur(this.model).subscribe(res=>{
        console.log(res);
        this.inputCodeFour.nativeElement.value=""
        this.inputNomFour.nativeElement.value=""
        this.inputTelFour.nativeElement.value=""
        this.inputVilleFour.nativeElement.value=""
  
        this.listeFournisseurs()
        // this.ListeLocation()
        this._snackBar.open('fournisseur ajoute ', 'OK', {
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
  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listeFournisseurs(){
    this.Arrayfournisseurs = []
    this.fournisseurService.getListeFournisseur().subscribe((fournisseurs: any) => {
      for(let i=0; i<fournisseurs.length; i++){
        this.Arrayfournisseurs.push(fournisseurs[i])
        
    }
    console.log(this.Arrayfournisseurs)
      // myArray = this.myString.split(',');
      ELEMENT_DATA = this.Arrayfournisseurs;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }


  addLivraison(code:any){
    let dialogRef=this.dialog.open( AddLivraisonComponent, {
      data: {code: code},
    });
    dialogRef.afterClosed().subscribe(() => { this.listeFournisseurs(); } );
   }

  
  

}
