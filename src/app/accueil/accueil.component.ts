import { Component, OnInit,ViewChild, ElementRef , Inject } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  @ViewChild('emailInput') emailInputElement!: ElementRef<HTMLInputElement>;
  constructor() { 
    AOS.init();
  }

  ngOnInit(): void {
   
  }
  click(){
    this.emailInputElement.nativeElement.value=""
  }

}
