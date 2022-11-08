import { CommandeService } from './../Service01/commande.service';
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Client{
  codeCli: number|null,
}
export interface Commande {
  client: Client|null,
  numCmd: number|null,
  dateCmd: Date|null,
}

@Component({
  selector: 'app-ajouter-commande',
  templateUrl: './ajouter-commande.component.html',
  styleUrls: ['./ajouter-commande.component.css']
})
export class AjouterCommandeComponent implements OnInit {
  codeCli:any
  modelClient:Client={
    codeCli:null,

  }
  model:Commande={
    numCmd:null,
    dateCmd:null,
    client:null,
  }
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private commandeService:CommandeService) {
    this.codeCli=element.code
    this.modelClient.codeCli=element.code
    this.model.client=this.modelClient
  }

  ngOnInit(): void {
  }

  sendCommande(){
    this.commandeService.addCommand(this.model).subscribe(res=>{
      console.log(res);
      this._snackBar.open('Commande ajoute ', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }

}
