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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener() {
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
  const cartItem = document.querySelector('.cart__items');
  const ids = e.target.parentNode.firstChild.innerText;
  const item = await fetchItem(ids);

  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cartItem.appendChild(createCartItemElement(obj));
};

const addToCart = () => {
  const btnAdd = document.querySelectorAll('.item__add');
  btnAdd.forEach((btn) => {
    btn.addEventListener('click', getFetchItem);
  });
};

window.onload = async () => {
  await getFetchProducts();
  addToCart();
};
