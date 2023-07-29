import { Injectable } from '@angular/core';
import { sample_foods } from '../../data';
import { food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():food[]{
    return sample_foods;
  }

  getFoodById(foodId:string):food{
    return this.getAll().find(food => food.id == foodId) ?? new food();
  }
}