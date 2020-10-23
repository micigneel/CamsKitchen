import { Component, OnInit, } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './globalStore/app.reducer';
import * as authAction from './auth/authStore/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'CamsKitchen';

  constructor(private store : Store<fromApp.AppState>){}

  ngOnInit(){
      this.store.dispatch(authAction.AutoLoginAction());
  }


}
