const cart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// --------------------------------------------------------------------------
function createCartImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'cart__image';
  img.src = imageSource;
  return img;
}
// --------------------------------------------------------------------------

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`)); //
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
  total.innerText = `R$ ${sumOf.toFixed(2)}`;
}

function cartItemClickListener(e) {
  e.target.remove();
  saveCartItems(cart.innerHTML);
  sum();
}

function createCartItemElement({ image, sku, name, sale }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} \n NAME: ${name.split(' ').slice(0, 6).join(' ')} \n PRICE: $${sale}`;
  li.appendChild(createCartImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getFetchProducts = async (param) => { 
  const itens = document.querySelector('.items');
  const fetchPdt = await fetchProducts(param);
  const objFinal = fetchPdt.results;
  objFinal.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title.split(' ').slice(0, 6).join(' '),
      image: element.thumbnail,
      price: element.price.toFixed(2),
    };
    itens.appendChild(createProductItemElement(obj));
  });
 };

const getFetchItem = async (e) => {
  const ids = e.target.parentNode.firstChild.nextSibling.innerText;
  const item = await fetchItem(ids);

  const obj = {
    image: item.thumbnail,
    sku: item.id,
    name: item.title,
    sale: item.price,
  };
  cart.appendChild(createCartItemElement(obj));
  saveCartItems(cart.innerHTML);
  sum();
};

const addToCart = () => {
  const btnAdd = document.querySelectorAll('.item__add');
  btnAdd.forEach((btn) => {
    btn.addEventListener('click', getFetchItem);
  }); 
  saveCartItems(cart.innerHTML);//
  sum();//
};

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

const loadPage = document.querySelector('.loading');
const searchBtn = document.querySelector('.searchBtn');
const items = document.querySelector('.items');
const search = document.querySelector('.inputTxt');
const loader = document.querySelector('.loader');

window.onload = async () => {
  await getFetchProducts('computador');
  loadPage.innerText = 'Carregando...';
  loader.classList.add('on');
  await getFetchProducts(search.value);
  loadPage.innerText = '';
  loader.classList.remove('on');
  loadStorage();
  addToCart();
};

// -----------------------------------------------------------------------
async function searchItem() {
  items.innerHTML = '';
  loadPage.innerText = 'Carregando...';
  loader.classList.add('on');
  await getFetchProducts(search.value);
  loadPage.innerText = '';
  loader.classList.remove('on');
  addToCart();
  search.value = '';
}

searchBtn.addEventListener('click', () => {
  searchItem();
  });
search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchItem();
    }
  });
// ------------------------------------------------------------------------

  const reload = document.querySelector('.container-title')
  reload.addEventListener('click', () => location.reload())

  const categories = document.querySelector('.categories');
  const categ = document.querySelectorAll('.categ')

 categ.forEach((element) => element.addEventListener('click', async (e) => {
   const value = e.target.innerText
  if(!value) throw new Error('Gambiarrinha marota!')

  items.innerHTML = '';
  loadPage.innerText = 'Carregando...';
  loader.classList.add('on');
  await getFetchProducts(`${value}`);
  loadPage.innerText = '';
  loader.classList.remove('on');
  addToCart();
  console.log(e.target.innerText)
 }))

 const carrinho = document.querySelector('.material-icons');

 carrinho.addEventListener('click', () => {
   document.querySelector('.cart').innerHTML = ''
   document.querySelector('.cart').style.flexBasis = '0%'
   document.querySelector('.items').style.flexBasis = '100%'
   document.querySelector('.container-cartTitle').innerHTML = ''
   document.querySelector('.container-cartTitle').style.width = '0%'
 })
