const fetchItem = async (item) => {
 const url = `https://api.mercadolibre.com/items/${item}`;

  try {
    const promise = await fetch(url);
    const response = await promise.json();
    return response;
    // console.log(response)
  } catch (error) {
    return new Error('You must provide an url');
  }
};
fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
