import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as authAction from '../auth/authStore/auth.action';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated : boolean = false ;
  navbarState : boolean = true;

  constructor( private store : Store<fromApp.AppState>, private router : Router) { }

  ngOnInit(): void {
      this.store.select('auth').subscribe(
        (authState)=>{
            if(authState.user){
              this.isAuthenticated = true;
            }
            else{
              this.isAuthenticated = false;
            }
        }
      );
  }


  onSearch(searchForm : NgForm){
    let searchData = searchForm.value.search;
    this.router.navigate(['/recipes', 'all'],
    {
      queryParams : { 'search' : searchData }
    }
    );
    searchForm.reset();

  }

  onLogout(){
      this.store.dispatch(authAction.LogOutAction());
  }

}
