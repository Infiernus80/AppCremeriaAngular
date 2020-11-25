import { Productos } from './articulo';

export class ShoppingCart {
  producto:{
    Codigo:"",
    NombreProd:"",
    Precio:"",
    img:""
  }
  items: Map<Productos, number >;

  constructor() {
    this.items = new Map<Productos, number>();
  }
  

  addArticle(article) {
    if (this.items.has(article)) {
      this.items.set(article, this.items.get(article) + 1);
    } else {
      this.items.set(article, 1);
    }
  }

  get isEmpty(): boolean {
    return this.items.size === 0;
  }

  get totalPrice(): number {
    let total = 0;
    for (const entry of this.items.entries()) {
      total += entry[0].precio * entry[1];
    }
    return total;
  }

}
