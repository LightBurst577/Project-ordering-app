import { menuArray } from "./data.js";

let itemsInCart = [];

addEventListener("click", function (e) {
  if (e.target.dataset.itemsId) {
    addItem(e.target.dataset.itemsId);
  } else if (e.target.dataset.itemRemove) {
    removeItem(e.target.dataset.itemRemove);
  } else if (e.target.dataset.complete) {
    completeSend();
  }
});

const orderPanel = document.getElementById("orderPanel");
const pop = document.getElementById("payment-form");
const itIsSubmit = document.getElementById("itIsSubmit");
pop.addEventListener("submit", function (e) {
  e.preventDefault();
  submited();
});

function submited() {
  pop.style.display = "none";
  orderPanel.style.display = "none";
  itIsSubmit.style.display = "block";
}

function completeSend() {
  pop.style.display = "flex";
}

function addItem(orderNum) {
  const targetItemObj = menuArray.find((item) => item.id === Number(orderNum));
  if (targetItemObj) {
    // To Push object data items and price
    itemsInCart.push(targetItemObj);
  }
  renderOrder(); // render
}

function removeItem(orderNum) {
  // Find the first index of the item with that ID
  const targetIndex = itemsInCart.findIndex(
    (item) => item.id === Number(orderNum),
  );

  // Remove only that one item from the array the id is 0 to 2
  // This will detele the items if the ID is same
  if (targetIndex > -1) {
    itemsInCart.splice(targetIndex, 1);
    console.log(targetIndex);
  }
  renderOrder();
}

function renderOrder() {
  let totalPrice = 0;
  let orderHtml = "";

  itemsInCart.forEach((item) => {
    totalPrice += item.price;
    orderHtml += `
            <div class="order-item">
                <div class="item-name">${item.name}</div>
                <div class="remove-item-btn" data-item-remove="${item.id}">remove</div>
                <div class="item-price">$${item.price}</div>
            </div>`;
  });

  if (itemsInCart.length > 0) {
    orderPanel.innerHTML = `            
            <div class="checkout-section">
                <h2 class="title">Your order</h2>
                <div id="items-In-Cart">${orderHtml}</div>
                <div class="divider"></div>
                <div class="total-row">
                    <div>Total price:</div>
                    <div class="total-price">$${totalPrice}</div>
                </div>
                <button class="purchase-btn" data-complete="orderSend">Complete order</button>
            </div>`;
  } else {
    orderPanel.innerHTML = "";
  }
}

function renderElements() {
  const menuHtml = menuArray
    .map((item) => {
      const { name, ingredients, id, price, emoji } = item;
      return `
            <div class="menu-items">
                <h2 class="food">${emoji}</h2>
                <div class="content-container">
                    <h3>${name}</h3>
                    <p>${ingredients.join(", ")}</p>
                    <h3>${price}$</h3>
                </div>
                <div class="btn-circle" data-items-id="${id}">
                    <h3 data-items-id="${id}">+</h3>
                    <svg data-items-id="${id}" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                    </svg>
                </div>       
            </div>`;
    })
    .join("");
  document.getElementById("list-items").innerHTML = menuHtml;
}

renderElements();
