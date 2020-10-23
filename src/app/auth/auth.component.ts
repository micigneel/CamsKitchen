import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp  from '../globalStore/app.reducer';
import * as authActions from './authStore/auth.action';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode : boolean = true;
  loading : boolean = false;
  error : string = null;
  messageType : string ;
  subsink  = new SubSink();

  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.subsink.add(
      this.store.select('auth').subscribe(
        (authData)=>{
          this.loading = authData.loading;
          if(authData.errorMessage){
            this.error = authData.errorMessage;
            this.messageType = 'error';
          }
          else {
            this.error = null;
            this.messageType = null;
          }
        }
      )
    );
  }

  onSubmit(formData : NgForm){
      if(this.isLoginMode){
          this.store.dispatch(authActions.loginStartAction({
            email : formData.value.email,
            password : formData.value.password
          }));
      }
      else{
        this.store.dispatch(authActions.SignupStartAction({
          email : formData.value.email,
          password : formData.value.password
        }));

      }
  }

  modeChange(){
    this.isLoginMode = ! this.isLoginMode;
  }

  onClose( event ){
    if(event){
      this.store.dispatch(authActions.ClearErrorAction());
    }
  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }

}
