let products = document.getElementById("products");

let cartList = JSON.parse(localStorage.getItem("data")) || [];

let generateProducts = () => {
  return (products.innerHTML = productItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = cartList.find((x) => x.id === id) || [];
      return `
<div class="item" id="product-id-${id}">
            <img width="200" src=".${img}" alt="img-1">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        
                        <div id=${id} class="quantity">${
        search.items === undefined ? 0 : search.items
      }</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
};

generateProducts();

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

  localStorage.setItem("data", JSON.stringify(cartList));
};
let update = (id) => {
  let search = cartList.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.items;
  calculation();
};

let calculation = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = cartList
    .map((x) => x.items)
    .reduce((a, b) => a + b, 0);
};

calculation();
