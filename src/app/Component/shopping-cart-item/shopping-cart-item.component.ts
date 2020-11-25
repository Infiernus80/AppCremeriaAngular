import { Component, Input, OnInit } from '@angular/core';
import { Productos} from '../home/articulo';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {

  constructor() {
  }

  @Input()
  article: Productos;

  @Input()
  count: number;

  ngOnInit(): void {
  }

}
