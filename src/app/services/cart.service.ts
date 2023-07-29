// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Cart, CartItem } from '../models/cart.model';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cart= new BehaviorSubject<Cart>({items: []});
//   constructor(private _snackBar: MatSnackBar) { }

//   addToCart(item: CartItem): void{
//     const items=[...this.cart.value.items];
//     const itemInCart= items.find((_item)=>_item.id === item.id);
//     if (itemInCart){
//       itemInCart.quantity+=1;
//     }else{
//       items.push(item);
//     }

//     this.cart.next({items});
//     this._snackBar.open('1 item added to cart.', 'Okay',{duration: 2000});
//     console.log(this.cart.value)

//   }

//   getTotal (items: Array<CartItem>): number{
//     return items.map((item)=> item.price*item.quantity).reduce((prev, current) => prev+current,0);
//    }

//   clearCart():void{
//     this.cart.next({items: []});
//     this._snackBar.open('Cart was emptied', 'OK', {duration: 2000})
//   } 
//   removeFromCart(item: CartItem, update=true): Array<CartItem>{
//     const filteredItems=
//     this.cart.value.items.filter((_item)=> _item.id !== item.id);
   
//     if(update){
//       this.cart.next({items: filteredItems});
//     this._snackBar.open('1 item removed from cart.','OK',{duration: 2000});
//   }
//   return filteredItems;
//   }
//   removeQuantity(item: CartItem): void{
//     let itemForRemoval: CartItem | undefined;

//     let filteredItems=this.cart.value.items.map((_item)=> {
//       if(_item.id===item.id){
//         _item.quantity--;
//       }
//       if(_item.quantity === 0){
//         itemForRemoval = _item;
//       }
//       return _item;
//     });
//     if(itemForRemoval){
//       filteredItems = this.removeFromCart(itemForRemoval, false);
//     }
    
//     this.cart.next({items: filteredItems});
//     this._snackBar.open('1 item removed from cart.', 'Okay',{duration: 2000});
    
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

import { food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(food: food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }
  
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}