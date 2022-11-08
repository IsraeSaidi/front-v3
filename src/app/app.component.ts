
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  
}
