let products = document.getElementById("products");

let productItemsData = [
  {
    id: "uwuje1",
    name: "casual shirt Bob",
    price: 10,
    desc: "Casual shirt made of cotton in two colors",
    img: "/images/img-1.jpg",
  },
  {
    id: "wudues2",
    name: "casual shirt Mark",
    price: 12,
    desc: "Casual shirt made of cotton in two colors",
    img: "/images/img-1.jpg",
  },
  {
    id: "sadgasd3",
    name: "casual shirt Brown",
    price: 12,
    desc: "Casual shirt made of cotton in two colors",
    img: "/images/img-1.jpg",
  },
  {
    id: "asfdsg4",
    name: "casual shirt Terry",
    price: 10,
    desc: "Casual shirt made of cotton in two colors",
    img: "/images/img-1.jpg",
  },
  {
    id: "dasdasd5",
    name: "casual shirt Roy",
    price: 15,
    desc: "Casual shirt made of cotton in two colors",
    img: "/images/img-1.jpg",
  },
];

let cartList = [];

let generateProducts = () => {
  return (products.innerHTML = productItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      return `
<div class="item" id="product-id-${id}">
            <img width="200" src="${img}" alt="img-1">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">0</div>
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
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
};
let decrement = (id) => {
  let selectedItemId = id;
  let search = cartList.find((x) => x.id === selectedItemId.id);

  if (search.items === 0) return;
  else {
    search.items -= 1;
  }
  update(selectedItemId.id);
};
let update = (id) => {
  let search = cartList.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.items;
  calculation();
};

let calculation = () => {
  let cartAmount = document.getElementById("cartAmount");
  console.log("calc is running");
};
