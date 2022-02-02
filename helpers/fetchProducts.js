const fetchProducts = async (query) => {
  let produtos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  produtos = await produtos.json();
  return produtos.results.map(item => {
    return {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
  });
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
