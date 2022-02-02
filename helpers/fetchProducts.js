const fetchProducts = async (search) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;

    try {
      const promise = await fetch(url);
      return promise.json()
      .then((data) => data);
    } catch (error) {
      return new Error('You must provide an url');
    }
  };

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
