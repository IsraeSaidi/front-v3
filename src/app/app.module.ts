
import { NgModule } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import{MatListModule}from '@angular/material/list';

import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatSelectModule} from '@angular/material/select';
import { AccueilComponent } from './accueil/accueil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SocieteComponent } from './societe/societe.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { LigneLivraisonComponent } from './ligne-livraison/ligne-livraison.component';
import { ArticleComponent } from './article/article.component';
import { LigneCommandeComponent } from './ligne-commande/ligne-commande.component';
import { CommandeComponent } from './commande/commande.component';
import { ClientComponent } from './client/client.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { AjouterCommandeComponent } from './ajouter-commande/ajouter-commande.component';
import { ModifierArticleComponent } from './modifier-article/modifier-article.component';
import { ModifierLigneCommandeComponent } from './modifier-ligne-commande/modifier-ligne-commande.component';
import { ModifierFournisseurComponent } from './modifier-fournisseur/modifier-fournisseur.component';
import { ModifierSocieteComponent } from './modifier-societe/modifier-societe.component';
import { AddLivraisonComponent } from './add-livraison/add-livraison.component';

// import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SidebarComponent,
    SocieteComponent,
    FournisseurComponent,
    LivraisonComponent,
    LigneLivraisonComponent,
    ArticleComponent,
    LigneCommandeComponent,
    CommandeComponent,
    ClientComponent,
    ModifierClientComponent,
    AjouterCommandeComponent,
    ModifierArticleComponent,
    ModifierLigneCommandeComponent,
    ModifierFournisseurComponent,
    ModifierSocieteComponent,
    AddLivraisonComponent
  ],
  imports: [
    MatExpansionModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    RouterModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
