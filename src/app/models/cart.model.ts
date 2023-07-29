// export interface Cart {
//     items: Array <CartItem>
// }

// export interface CartItem {
//     product: string;
//     name: string;
//     price: number;
//     quantity: number;
//     id: number;
// }
import {food} from '../models/food.model'

export class Cart{
    items:CartItem[] = [];
    totalPrice:number = 0;
    totalCount:number = 0;
  }

  export class CartItem{
    constructor(public food:food){ }
    quantity:number = 1 ;
    price: number = this.food.price;
  }