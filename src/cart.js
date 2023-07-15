let cartList = JSON.parse(localStorage.getItem("data")) || [];

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = cartList
    .map((x) => x.items)
    .reduce((a, b) => a + b, 0);
};

calculation();

let generateCartItems = () => {
  if (cartList.length !== 0) {
    return (shoppingCart.innerHTML = cartList
      .map((x) => {
        let { id, items } = x;
        let search = productItemsData.find((x) => x.id === id) || [];
        return `
        <div class="cart-item">
        <img width="100" src=".${search.img}" alt="img-1">
        <div class="details">
        <div class="title-price-x">
        <h4 class="title-price">
        <p>${search.name}</p>
        <p class="cart-item-price">$ ${search.price}</p>
        
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>
        <div class="buttons">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
        <div id=${id} class="quantity">${items}</div>
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${items * search.price}</h3>
        </div>
        </div>
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Your cart is empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to home</button>
        </a>
        `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItemId = id;
  let search = cartList.find((x) => x.id === selectedItemId.id);

  if (search === undefined) {
    cartList.push({
      id: selectedItemId.id,
      items: 1,
    });
  } else {
    search.items += 1;
  }
  update(selectedItemId.id);

  cartList = cartList.filter((x) => x.items !== 0);
  generateCartItems();

  localStorage.setItem("data", JSON.stringify(cartList));
};
let decrement = (id) => {
  let selectedItemId = id;
  let search = cartList.find((x) => x.id === selectedItemId.id);

  if (search === undefined) return;
  if (search.items === 0) return;
  else {
    search.items -= 1;
  }

  update(selectedItemId.id);

  cartList = cartList.filter((x) => x.items !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(cartList));
};
let update = (id) => {
  let search = cartList.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.items;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  cartList = cartList.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  calculation();
  totalAmount();

  localStorage.setItem("data", JSON.stringify(cartList));
};

let clearCart = () => {
  cartList = [];
  generateCartItems();
  calculation();

  localStorage.setItem("data", JSON.stringify(cartList));
};

let totalAmount = () => {
  if (cartList.length !== 0) {
    let amount = cartList
      .map((x) => {
        let { id, items } = x;
        let search = productItemsData.find((a) => a.id === id) || [];
        return items * search.price;
      })
      .reduce((a, b) => a + b, 0);
    console.log(amount);
    label.innerHTML = `
    <h2>Total Bill: $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear cart</button>`;
  } else return;
};
totalAmount();
