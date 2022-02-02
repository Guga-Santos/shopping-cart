require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {

  it('Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Execute a função `fetchProducts` com o argumento "computador" e teste se `fetch` foi chamada', () => {
    fetchProducts('computador');

    expect(fetch).toBeCalled()
    // https://jestjs.io/docs/expect#tohavebeencalled
  })

  it('Testa se, passado o argumento, a função utiliza o endPoint correto', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'

    fetchProducts('computador')

    expect(fetch).toBeCalledWith(url)
  })

  it('Testa se, ao ser chamada, a função retorna uma estrutura igual ao objeto computadorSearch',async () => {
    const resultado = await fetchProducts('computador')
    expect(resultado).toEqual(computadorSearch);
    // https://jestjs.io/docs/asynchronous
  })

  it('Testa se, ao chamar a função sem argumento, retorna a mensagem de erro', async () => {
    // const errorMsg = 'You must provide an url'
    const error = new Error('You must provide an url')

    const resultado = await fetchProducts();
    expect(resultado).toEqual(error)
  })
});
