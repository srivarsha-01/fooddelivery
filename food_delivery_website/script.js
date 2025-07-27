const fallbackSrc = 'images/placeholder.jpg'; // a local fallback image in your images folder

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Dish ${i + 1}`,
  price: Math.floor(Math.random() * 200 + 100),
  img: `images/item${i + 1}.jpg`
}));

const menuGrid = document.querySelector('.menu-grid');
const cartList = document.getElementById('cart-list');
const checkoutBtn = document.getElementById('checkout');
const cart = [];

// Render menu cards
items.forEach(item => {
  const card = document.createElement('div');
  card.className = 'menu-card';

  const img = document.createElement('img');
  img.src = item.img;
  img.alt = item.name;
  img.onerror = function() {
    this.onerror = null;
    this.src = fallbackSrc;
  };

  const info = document.createElement('div');
  info.className = 'menu-info';
  info.innerHTML = `
    <h3>${item.name}</h3>
    <p>₹${item.price}</p>
    <button onclick="addToCart(${item.id})">Add to Cart</button>
  `;

  card.appendChild(img);
  card.appendChild(info);
  menuGrid.appendChild(card);
});

// Add to cart logic
function addToCart(id) {
  const item = items.find(x => x.id === id);
  cart.push(item);
  renderCart();
}

// Render cart and total
function renderCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });
  checkoutBtn.textContent = `Checkout ₹${total}`;
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert(`Order placed! Total ₹${cart.reduce((sum, i) => sum + i.price, 0)}`);
    cart.length = 0;
    renderCart();
  }
});
