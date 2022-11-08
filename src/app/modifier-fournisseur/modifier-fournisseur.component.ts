
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';
import { FournisseurService } from '../Service01/fournisseur.service';
export interface listeFournisseur {
  codeFour: number|null,
  nomFour: string,
  telFour: string,
  villeFour: string,
}
@Component({
  selector: 'app-modifier-fournisseur',
  templateUrl: './modifier-fournisseur.component.html',
  styleUrls: ['./modifier-fournisseur.component.css']
})
export class ModifierFournisseurComponent implements OnInit {
  model:listeFournisseur={
    codeFour: null,
    nomFour: '',
    telFour: '',
    villeFour: ''
  }
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private router: Router,private fournisseurService: FournisseurService) { 
      this.model.codeFour=element.element.codeFour
      this.model.nomFour=element.element.nomFour
      this.model.telFour=element.element.telFour
      this.model.villeFour=element.element.villeFour


  }

  ngOnInit(): void {
  }
  modifierFournisseur(){
    if(this.model.codeFour!=null && this.model.nomFour!="" &&this.model.telFour!=""&&this.model.villeFour!=""){
      
      this.fournisseurService.modifierFournisseur(this.model.codeFour,this.model).subscribe(res=>{
       console.log(res);
       // this.ListeLocation()
       this._snackBar.open('Fournisseur N°'+this.model.codeFour+' Modifier ', 'OK', {
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
