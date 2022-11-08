
import { Router } from '@angular/router';
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from '../Service01/client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface listeClient {
  codeCli: number|null,
  nomCli: string,
  preCli: string,
  adrCli: string,
  telCli: string,
  villeCli: string
}
@Component({
  selector: 'app-modifier-client',
  templateUrl: './modifier-client.component.html',
  styleUrls: ['./modifier-client.component.css']
})
export class ModifierClientComponent implements OnInit {
  model:listeClient={
    codeCli:null,
    nomCli:'',
    preCli:'',
    adrCli:'',
    telCli:'',
    villeCli:''
  }
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public element: any,private router: Router,private clientService: ClientService) { 
      this.model.codeCli=element.element.codeCli
      this.model.nomCli=element.element.nomCli
      this.model.preCli=element.element.preCli
      this.model.adrCli=element.element.adrCli
      this.model.telCli=element.element.telCli
      this.model.villeCli=element.element.villeCli

  }

  ngOnInit(): void {
  }
  UpdateClient(){
    if(this.model.codeCli!=null && this.model.nomCli!="" &&this.model.preCli!=""&&this.model.adrCli!=""&&this.model.telCli!=""&&this.model.villeCli!=""){
      
      this.clientService.modifierClient(this.model.codeCli,this.model).subscribe(res=>{
       console.log(res);
       // this.ListeLocation()
       this._snackBar.open('Client'+this.model.codeCli+' Modifier ', 'OK', {
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
