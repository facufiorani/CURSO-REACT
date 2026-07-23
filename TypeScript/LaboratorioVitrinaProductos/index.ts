interface Item {
  type: "book" | "electronics" | "clothing";
  id: string;
  price: number;
}

interface Book extends Item {
  type: "book";
  title: string;
  author: string;
}

interface Electronics extends Item {
  type: "electronics";
  item: string;
  model: string;
  warranty?: number;
}

interface Clothing extends Item {
  type: "clothing";
  item: string;
  brand: string;
  size?: "S" | "M" | "L";
}

type Product = Book | Electronics | Clothing;


class Collection<T> {
  items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  filter(callback: (item: T) => boolean): T[] {
    return this.items.filter(callback);
  }
}


function renderProduct(product: Product): string {

  let info = "";

  if (product.type === "book") {
    info = `Book: ${product.title} by ${product.author}`;
  } 
  
  else if (product.type === "electronics") {
    info = `Electronics: ${product.item} - ${product.model}`;

    if (product.warranty) {
      info += ` - Warranty: ${product.warranty} year(s)`;
    }
  } 
  
  else if (product.type === "clothing") {
    info = `Clothing: ${product.item} by ${product.brand}`;

    if (product.size) {
      info += ` - Size ${product.size}`;
    }
  } 
  
  else {
    throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
  }


  return `
    <div class="item" id="${product.id}">
      <div class="price">$${product.price}</div>
      <div>${info}</div>
    </div>
  `;
}



const products = new Collection<Product>([
  {
    type: "book",
    id: "b1",
    price: 20,
    title: "Clean Code",
    author: "Robert Martin"
  },
  {
    type: "electronics",
    id: "e1",
    price: 500,
    item: "Laptop",
    model: "ThinkPad",
    warranty: 2
  },
  {
    type: "clothing",
    id: "c1",
    price: 40,
    item: "T-Shirt",
    brand: "Nike",
    size: "M"
  }
]);



const output = document.querySelector<HTMLDivElement>("#output")!;


function showProducts(filter?: Product["type"]): void {

  let productsToShow: Product[];

  if (filter) {
    productsToShow = products.filter(
      product => product.type === filter
    );
  } else {
    productsToShow = products.getAll();
  }


  output.innerHTML = productsToShow
    .map(product => renderProduct(product))
    .join("");
}



const allButton = document.querySelector<HTMLButtonElement>("#all")!;
const booksButton = document.querySelector<HTMLButtonElement>("#books")!;
const electronicsButton = document.querySelector<HTMLButtonElement>("#electronics")!;
const clothingButton = document.querySelector<HTMLButtonElement>("#clothing")!;


allButton.addEventListener("click", () => showProducts());

booksButton.addEventListener("click", () => showProducts("book"));

electronicsButton.addEventListener("click", () => showProducts("electronics"));

clothingButton.addEventListener("click", () => showProducts("clothing"));

document.addEventListener('DOMContentLoaded', () => {showProducts()})