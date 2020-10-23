import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../shared/modal/MenuItem';
import { map } from 'rxjs/operators';

export const initialMenu: MenuItem[] = [
  new MenuItem(
    'Pizza\'s',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=980:*',
    "Nothing beats a fresh-out-of-the-oven pizza",
    'pizza'
  ),
  new MenuItem(
    'Briyani',
    'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ejxildyfxdtcddsew3ii',
    'Keep Calm and Add Dum to YOUR Briyani!',
    'briyani'
  ),
  new MenuItem(
    'Chinese',
    'https://i2.wp.com/vegecravings.com/wp-content/uploads/2017/03/veg-hakka-noodles-recipe-with-step-by-step-instructions.jpg?w=1838&quality=65&strip=all&ssl=1',
    'The Indian Version of Chinese',
    'chinese'
  ),
  new MenuItem(
    'Pastry',
    'https://img-global.cpcdn.com/recipes/b6cd3528e7ea3367/1502x1064cq70/fruit-pastry-cake-recipe-main-photo.jpg',
    'Many vareties of baked GOODNESS',
    'pastry'
  )
];



@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuURL: string = 'https://camskitchen-f1a0c.firebaseio.com/menu-items.json';



  constructor(private http: HttpClient) {}

  getMenuItems() {
    return this.http.get<MenuItem>(this.menuURL)
    .subscribe(
      (response)=>{

      },
      (err)=>{
        console.log("Error Occured ="+ err);
      }
    );
  }

  saveMenuItems() {
    return this.http.put(this.menuURL, initialMenu)
    .subscribe(
      (respone)=>{
        console.log('Response ='+respone);
      }
    );
  }
}
