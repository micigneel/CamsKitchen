import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../globalStore/app.reducer';
import { MenuItem } from 'src/app/shared/modal/MenuItem';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuArray : MenuItem[] = [];

  constructor(  private store : Store<fromApp.AppState>,) { }

  ngOnInit(): void {
    this.store.select('menu').subscribe(
      (menuData)=>{
        this.menuArray = menuData.menuItems;
      }
    );
  }

}
