require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {

  it('Teste de fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function')
  });

  it('Execute a função com um argumento e teste se fetch foi chamada', () =>{
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled()
  });

  it('Teste se ao chamar a função com argumento, o endpoint é o correto', () => {
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';

    fetchItem('MLB1615760527');

    expect(fetch).toBeCalledWith(endPoint)
  });

  it('Teste se o retorno da função fetchItem com o argumento MLB1615760527 é igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item)
  });

  it('Teste se, ao chamar a função sem argumento, uma mensagem de erro é recebida.', async () => {
    const error = new Error('You must provide an url')
    
    const resultado = await fetchItem();
    expect(resultado).toEqual(error)
  });

});
