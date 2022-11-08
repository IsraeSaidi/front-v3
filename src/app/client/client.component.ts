
import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import { ModifierClientComponent } from '../modifier-client/modifier-client.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators,FormBuilder,FormGroup } from '@angular/forms';
import { ClientService } from '../Service01/client.service';
import { AjouterCommandeComponent } from '../ajouter-commande/ajouter-commande.component';
export interface listeClient {
  codeCli: number|null,
  nomCli: string,
  preCli: string,
  adrCli: string,
  telCli: string,
  villeCli: string
}
let ELEMENT_DATA: listeClient[] = [
];
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild('codeInput') codeInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('nomInput') nomInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('prenomInput') prenomInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('addresseInput') addresseInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('teleInput') teleInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('villeInput') villeInputElement!: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['codeCli','nomCli','preCli','adrCli','telCli','villeCli','Action'];
  form!:FormGroup
  tabIndex: any;
  dataSource:any
  String:any
  ArrayClient :any;
  ArrayClients:any[]=[];
  selected:any
  model:listeClient={
    codeCli:null,
    nomCli:'',
    preCli:'',
    adrCli:'',
    telCli:'',
    villeCli:''
  }
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private formBuilder:FormBuilder,private clientService: ClientService) {
    this.ListeClients()

    
    
   }

   deleteClient(code:any){
    this.clientService.deleteClient(code).subscribe(res=>{

      this.ListeClients();
      // this.showSuccess("La suppression est réussite");
      this._snackBar.open('client '+code+" est supprime", 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    })
   }
   updateClient(element:any){
    let dialogRef=this.dialog.open( ModifierClientComponent, {
      data: {element: element},
    });
    dialogRef.afterClosed().subscribe(() => { this.ListeClients(); } );
   }
   addCommand(code:any){
    let dialogRef=this.dialog.open( AjouterCommandeComponent, {
      data: {code: code},
    });
    dialogRef.afterClosed().subscribe(() => { this.ListeClients(); } );
   }
  AddClient(){
    if(this.model.codeCli!=null && this.model.nomCli!="" &&this.model.preCli!=""&&this.model.adrCli!=""&&this.model.telCli!=""&&this.model.villeCli!=""){
      
       this.clientService.addClient(this.model).subscribe(res=>{
        console.log(res);
        this.codeInputElement.nativeElement.value=""
        this.nomInputElement.nativeElement.value=""
        this.prenomInputElement.nativeElement.value=""
        this.villeInputElement.nativeElement.value=""
        this.teleInputElement.nativeElement.value=""
        this.addresseInputElement.nativeElement.value=""
        this.ListeClients()
        // this.ListeLocation()
        this._snackBar.open('Client ajoute ', 'OK', {
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
  ListeClients(){
    this.ArrayClients = []
    this.clientService.getListeClient().subscribe((clients: any) => {
      for(let i=0; i<clients.length; i++){
        this.ArrayClients.push(clients[i])
        
    }
    console.log(this.ArrayClients)
      // myArray = this.myString.split(',');
      ELEMENT_DATA = this.ArrayClients;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);

  
   });
  }

  
  

}
