import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClientService } from '../Service01/client.service';
import { LigneCommandeComponent } from '../ligne-commande/ligne-commande.component';
import { CommandeService } from '../Service01/commande.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  ArrayClients:any[]=[];
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private clientService: ClientService,private commandeService:CommandeService) { 
    this.listeCommande();

  }


  array:any[]=[];
  listeCommande(){
    this.clientService.getCommandes().subscribe((commandes: any) => {
      for(let i=0; i<commandes.length; i++){
          if(commandes[i].commandes.length!=0){
            this.ArrayClients.push(commandes[i])
          }
        
    }
      console.log(this.ArrayClients)
       
   });
  }

  ngOnInit(): void {
  }
  getLigneCommandes(codeCommande:any){
    console.log(codeCommande)
    let dialogRef=this.dialog.open( LigneCommandeComponent, {
      data: {codeCommande: codeCommande},
    });
    dialogRef.afterClosed().subscribe(() => {  } );
  }

  deleteCmd(numCmd:any){
    this.commandeService.deleteCommande(numCmd).subscribe(res=>{
      this.ArrayClients=[];
      this.listeCommande();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('Commande '+numCmd+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
  }
}
