const cart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function sum() {
  const cartItem = document.querySelectorAll('.cart__item');
  let sumOf = 0;
  cartItem.forEach((obj) => {
    const objeto = obj.innerText.split(' ');
    const num = objeto.slice(-1)[0].slice(1);
    sumOf += Number(num);
  });
  const total = document.querySelector('.total-price');
  total.innerText = sumOf;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(e) {
  e.target.remove();
  saveCartItems(cart.innerHTML);
  sum();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getFetchProducts = async () => { 
  const itens = document.querySelector('.items');
  const fetchPdt = await fetchProducts('computador');
  const objFinal = fetchPdt.results;
  objFinal.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    itens.appendChild(createProductItemElement(obj));
  });
 };

const getFetchItem = async (e) => {
  const ids = e.target.parentNode.firstChild.innerText;
  const item = await fetchItem(ids);

  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cart.appendChild(createCartItemElement(obj));
  sum();
};

const addToCart = () => {
  const btnAdd = document.querySelectorAll('.item__add');
  btnAdd.forEach((btn) => {
    btn.addEventListener('mousedown', getFetchItem);
  }); 
  saveCartItems(cart.innerHTML);
  sum();
};

const boxes = document.querySelector('.items');
boxes.addEventListener('mousedown', () => saveCartItems(cart.innerHTML));
boxes.addEventListener('mouseup', () => saveCartItems(cart.innerHTML));
// boxes.addEventListener('mousedown', (e) => {
//   e.target.addEventListener('click', saveCartItems(cart.innerHTML));
// });
// boxes.addEventListener('mouseup', (e) => {
//   e.target.addEventListener('click', saveCartItems(cart.innerHTML));
// });

const loadStorage = () => {
  cart.innerHTML = getSavedCartItems();
  cart.childNodes.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

const eraserCartBtn = document.querySelector('.empty-cart');
eraserCartBtn.addEventListener('click', () => {
  cart.innerHTML = '';
  localStorage.removeItem('cartItems');
  sum();
});

window.onload = async () => {
  await getFetchProducts();
  loadStorage();
  addToCart();
};
