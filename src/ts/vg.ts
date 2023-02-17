/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.*/

export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]) {
  let productList: Product[] = products.slice();
  let sortedList: Product[] = [];
  let reverseList = false;

  if (sort === Sort.PRICE_ASCENDING || sort === Sort.NAME_ALPHABETIC_REVERSE) {
    reverseList = true;
  }

  sortedList = productList.sort((p1, p2) => {
    if (sort === Sort.PRICE_ASCENDING || sort === Sort.PRICE_DECENDING) {
      if (p1.price < p2.price) {
        return 1;
      } else if (p1.price > p2.price) {
        return -1;
      }
    } else {
      if (p1.name < p2.name) {
        return 1;
      } else if (p1.name > p2.name) {
        return -1;
      }
    }
    return 0;
  });

  if (reverseList) {
    sortedList.reverse();
  }
  return sortedList;
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {

  const quantity = cartList.reduce((total: number, item: { quantity: number; }) => {
    return total + item.quantity;
  }, 0);
  
  const floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = `${quantity}`;
}

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogImgContainer.className = "dogimgcontainer";
    dogproduct.appendChild(dogImgContainer);
    let dogImg: HTMLImageElement = document.createElement("img");

    dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

    dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });

    dogImgContainer.appendChild(dogImg);
    let cartSymbolContainer: HTMLDivElement = document.createElement("div");
    cartSymbolContainer.className = "cartSymbolContainer";
    dogImgContainer.appendChild(cartSymbolContainer);

    let cartSymbol: HTMLElement = document.createElement("i");
    cartSymbol.className = "bi bi-bag-plus";
    cartSymbolContainer.appendChild(cartSymbol);

    let name: HTMLHeadingElement = document.createElement("h5");
    name.innerHTML = productList[i].name;
    dogproduct.appendChild(name);

    let price: HTMLHeadingElement = document.createElement("p");
    price.innerHTML = "$" + productList[i].price;
    dogproduct.appendChild(price);

    let info: HTMLHeadingElement = document.createElement("p");
    info.innerHTML = productList[i].info;
    dogproduct.appendChild(info);

    productList[i].productSpec = false;

    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listAsText = JSON.stringify(productList);
      localStorage.setItem("savedList", listAsText);
    });

    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });

    switch (productList[i].category) {
      case "sassy":
        let category1: HTMLElement = document.getElementById("sassy") as HTMLElement;
        dogproduct.className = "dogproduct";
        category1.appendChild(dogproduct);
        break;
      case "kriminella":
        let category2: HTMLElement = document.getElementById("kriminella") as HTMLElement;
        dogproduct.className = "dogproduct";  //här finns konstiga svenska klassnamn, men om jag ändrar dem här och inte i "DOM" pajjar jag koden, så jag lät dessa vara därför.
        category2.appendChild(dogproduct);
        break;
      case "singlar":
        let category3: HTMLElement = document.getElementById("singlar") as HTMLElement;
        dogproduct.className = "dogproduct";
        category3.appendChild(dogproduct);
        break;
      case "puppy":
        let category4: HTMLElement = document.getElementById("puppy") as HTMLElement;
        dogproduct.className = "dogproduct";
        category4.appendChild(dogproduct);
        break;
      case "oldies":
        let category5: HTMLElement = document.getElementById("oldies") as HTMLElement;
        dogproduct.className = "dogproduct";
        category5.appendChild(dogproduct);
        break;
      default:
  }

  let listAsText = JSON.stringify(productList);
  localStorage.setItem("savedList", listAsText);
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

  function getFromStorage(): CartProduct[] {
    const fromStorage = localStorage.getItem("cartArray");
    
    if (fromStorage === null) {
      return [];
    }
    
    const productList: CartProduct[] = JSON.parse(fromStorage);
    return productList;
  }

  function createHTML(productList: CartProduct[]) {

  const container = document.getElementById("checkout-table");
  let amountContainer = document.getElementById("amount-checkout-container2") as HTMLDivElement;
  let amountText: HTMLTableCellElement = document.createElement("th");
  container?.appendChild(amountContainer)
  amountContainer.appendChild(amountText);
  amountText.innerHTML = "amount:";

  let titleContainer = document.getElementById("title-container") as HTMLTableRowElement;
  titleContainer.innerHTML = "<strong>products:</strong>";

  let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;
  let quantityText: HTMLTableCellElement = document.createElement("th");
  productQuantity.appendChild(quantityText);
  quantityText.innerHTML = "change quantity:";

  let checkkoutTotal2 = document.getElementById("title-total") as HTMLTableCellElement;
  let totalText: HTMLTableCellElement = document.createElement("th");
  checkkoutTotal2.appendChild(totalText);
  totalText.innerHTML = "total:";

  for (let i: number = 0; i < productList.length; i++) {
    let productName: HTMLTableCellElement = document.createElement("th");
    titleContainer.appendChild(productName);
    productName.innerHTML = productList[i].name;
    productName.className = "hej"; //tycker denna klass har konstigt namn, men vet inte vad det är tänkt att vara riktigt

    let productAmount: HTMLTableCellElement = document.createElement("th");
    amountContainer.appendChild(productAmount);
    productAmount.innerHTML = `x ${productList[i].amount}`;
    productAmount.className = "hej";

    let amountQuantity: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(amountQuantity);
    
    let amountPlusButton: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountPlusButton);
    amountQuantity.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountPlusButton.appendChild(icon);

    icon.className = "fas fa-minus";
    amountPlusButton.className = "plus-button";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountMinusButton: HTMLButtonElement = document.createElement("button");
    amountQuantity.appendChild(amountMinusButton);
    amountMinusButton.appendChild(icon2);
    amountMinusButton.className = "minus-button";
  }

  function calculateTotalPrice(productList: CartProduct[]) {

  const total = productList.reduce((accumulator, current) => {
    return accumulator + current.price * current.amount;
  }, 0);
  
  let totalPrice2: HTMLTableCellElement = document.createElement("th");
  checkkoutTotal2.appendChild(totalPrice2);
  totalPrice2.innerHTML = total + "$";
  totalPrice2.id = "total-in-center";
  }
}
  
//Har fortfarande otroligt svårt för att bena ut exakt hur jag ska refaktorera långa kodblock, och hur jag ska använda generics då det är så nytt att det inte har satt sig.
//Räknar inte med VG men försökte mig på den delen också bara för att göra mitt bästa och lära mig.
