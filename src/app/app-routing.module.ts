import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SocieteComponent } from './societe/societe.component';
import { LivraisonComponent } from './livraison/livraison.component';
import { ArticleComponent } from './article/article.component';
import { CommandeComponent } from './commande/commande.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path:"accueil",component:AccueilComponent},
  {path:"societe",component:SocieteComponent},
  {path:"fournisseur",component:FournisseurComponent},
  {path:"livraison",component:LivraisonComponent},
  {path:"article",component:ArticleComponent},

  {path:"commande",component:CommandeComponent},
  {path:"client",component:ClientComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
