import { CommandeService } from './../Service01/commande.service';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LivraisonService } from '../Service01/livraison.service';


export interface Fournisseur{
  codeFour: number|null,
}
export interface livraison {
 
  numLiv: number|null,
  date: Date|null,
  fournisseur: Fournisseur|null,
}

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.css']
})
export class AddLivraisonComponent implements OnInit {
  codeFour:any
  modelFournisseur:Fournisseur={
    codeFour:null,

  }
  model:livraison={
    numLiv:null,
    date:null,
    fournisseur:null,
  }
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private livraisonService:LivraisonService) {
    this.codeFour=element.code
    this.modelFournisseur.codeFour=element.code
    this.model.fournisseur=this.modelFournisseur
  }

  ngOnInit(): void {
  }

  addLivraison(){
    this.livraisonService.addLivraison(this.model).subscribe((res: any)=>{
      console.log(res);
      this._snackBar.open('Livraison ajoute ', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }

}
