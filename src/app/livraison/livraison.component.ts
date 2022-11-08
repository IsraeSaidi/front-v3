import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClientService } from '../Service01/client.service';
import { LigneCommandeComponent } from '../ligne-commande/ligne-commande.component';
import { CommandeService } from '../Service01/commande.service';
import { MatDialog } from '@angular/material/dialog';
import { LivraisonService } from '../Service01/livraison.service';
import { FournisseurService } from '../Service01/fournisseur.service';
import { LigneLivraisonComponent } from '../ligne-livraison/ligne-livraison.component';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
[x: string]: any;

  codeFour:any;
  ArrayFournisseurs:any[]=[];
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private fournisseurService: FournisseurService,private livraisonService:LivraisonService) { 
    this.getLivraison();

  }


  array:any[]=[];
 


  getLivraison(){
    this.fournisseurService.getLivraisons().subscribe((livraisons : any) => {
      for(let i=0; i<livraisons.length; i++){
        if(livraisons[i].livraisons.length!=0){
      
          this.array.push(livraisons[i])
        }
      }
    });
  }

  getLigneLivraisons(numLiv:any){
    console.log(numLiv)
    let dialogRef=this.dialog.open( LigneLivraisonComponent, {
      data: {numLiv: numLiv},
    });
    dialogRef.afterClosed().subscribe(() => {  } );
  }
    

    
  

  ngOnInit(): void {
  }
  

  deleteLiv(numLiv:any){
    this.livraisonService.deleteLivraison(numLiv).subscribe(res=>{
      this.array=[];
      this.getLivraison();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('Livraison '+numLiv+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }
}
