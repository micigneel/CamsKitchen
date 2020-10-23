import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initialCart } from '../shared/cartData';
import { User } from '../shared/modal/User';

@Injectable({
    providedIn : 'root'
  }
)
export class CartService  {
  cartURL : string = 'https://camskitchen-f1a0c.firebaseio.com/cart/';
  ext : string = '.json';

  user : User ;

  constructor(private http : HttpClient){
     this.user  = JSON.parse(sessionStorage.getItem('loggedUser'));
  }


  setCart(){
    this.http.put(this.cartURL+this.user.id+this.ext,
      initialCart
      ).subscribe(
        (response)=>{
            console.log('Cart Response :'+response)
        }
      );
  }

}
