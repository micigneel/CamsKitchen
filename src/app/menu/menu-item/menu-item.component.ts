import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/modal/MenuItem';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/globalStore/app.reducer';
import * as menuAction from '../menuStore/menu.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input('menu_item') menuItem : MenuItem ;

  constructor(private store : Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {

  }

  onCategoryAccess( categoryType : string){
        // this.store.dispatch(menuAction.SetCategoryAction({
        //   categoryType : categoryType
        // }))
    this.router.navigate(['/recipes', categoryType]);
  }

}
