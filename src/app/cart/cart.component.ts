import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../globalStore/app.reducer';
import * as cartAction from './cartStore/cart.action';
import { SubSink } from 'subsink';
import { Cart } from '../shared/modal/Cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { units, UnitInt } from '../shared/BasicData/units';
import { User } from '../shared/modal/User';
import { CartService } from './cart.service';
import { VideoSevice } from '../playlist/video.service';
import { RecipeDataService } from '../recipes/recipes.data-access.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  subsink = new SubSink();
  items : Cart[] ;
  units : UnitInt[] ;
  editForm : FormGroup;
  editIndex : number;
  currentUser : User;
  isEditMode : boolean = false;

  //On SuccessFul Save
  message : string = "Successfully Updated your Cart!"
  successFlag : boolean = false;
  messageType : string = 'success';

  //Pagination
  page : number = 1;
  totalRecords : number  ;

  constructor(private store : Store<fromApp.AppState>, private service : VideoSevice) { }

  ngOnInit(): void {
    this.units = units;

     this.subsink.add(
      this.store.select('cart').subscribe(
        (cartData)=>{
            this.items = cartData.carts;
            this.totalRecords = this.items.length;
            this.successFlag = cartData.updatedToServer;
            if(this.successFlag){
              setTimeout(
                ()=>{
                  this.successFlag = false;
                },
                1000
              );
            }
        }
      )
     );

     this.editForm = new FormGroup({
       item : new FormControl(null , Validators.required),
       quantity : new FormControl(null, Validators.required),
       unit : new FormControl('' , Validators.required)
     });

     this.currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));

  }

  onEdit( index: number ){
    this.editIndex = index;
    this.isEditMode = true;
    this.indexCheck();
    this.editForm.setValue({
        item : this.items[this.editIndex].item,
        quantity : this.items[this.editIndex].quantity,
        unit : this.items[this.editIndex].unit.toLowerCase()
      });

  }

  updateCart(){

    const editFormData = this.editForm.value;
    const slNo =  this.editIndex+1;
    const cartItem = new Cart(
      editFormData.item,
      editFormData.quantity,
      editFormData.unit
    );

    this.store.dispatch(cartAction.ModifiedAction({
      index : this.editIndex,
      item : cartItem
    }));
    this.isEditMode = false;
    this.editForm.reset();
  }

  addCart(){

    const editFormData = this.editForm.value;

    const slNo =  this.totalRecords + 1;
    const newCart = new Cart(
      editFormData.item,
      editFormData.quantity,
      editFormData.unit
    );
    this.store.dispatch(cartAction.AddAction({cart : newCart}))
    this.editForm.reset();
  }

  deleteCart(){
      this.store.dispatch(cartAction.DeleteAction({ index : this.editIndex}));
      this.isEditMode = false;
      this.editForm.reset();
  }

  addMode(){
    this.isEditMode = false;
    this.editForm.reset();
  }

  saveAllChanges(){
      this.store.dispatch( cartAction.SaveAllAction({
         userID : this.currentUser.id
      }));

      // this.service.setVideos();
  }

  indexCheck(){

    if(this.page !== 1){
      this.editIndex = ( (this.page -1 )* 5) + this.editIndex;
    }

  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }

}
