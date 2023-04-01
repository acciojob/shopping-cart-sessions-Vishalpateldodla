// This is the complete JavaScript code with shopping cart functionality
// Product data
const products = [  { id: 1, name: "Product 1", price: 10 },  { id: 2, name: "Product 2", price: 20 },  { id: 3, name: "Product 3", price: 30 },  { id: 4, name: "Product 4", price: 40 },  { id: 5, name: "Product 5", price: 50 },];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Event listeners
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = Number(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = getCart();
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  const cartItemIndex = cart.findIndex((item) => item.productId === productId);
  if (cartItemIndex !== -1) {
    const cartItem = cart[cartItemIndex];
    if (cartItem.quantity === 1) {
      cart.splice(cartItemIndex, 1);
    } else {
      cartItem.quantity--;
    }
    saveCart(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  saveCart([]);
  renderCart();
}

// Get cart data from session storage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart data to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Initial render
renderProducts();
renderCart();

