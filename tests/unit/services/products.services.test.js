const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { productsService} = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { happyQueryAll, happyQueryById } = require('./mocks/products.services.mock')

chai.use(sinonChai);

describe('Testando service do products', function () {
  it('Testa findAll do product', async function () {
    sinon.stub(productsModel, 'findAll').resolves(happyQueryAll);
    const result = await productsService.findAll();

    expect(result).to.be.deep.equal(happyQueryAll);
  });

 it('Test findById do product', async function () {
      sinon.stub(productsModel, 'findById').resolves(happyQueryById);

   const result = await productsService.findById(1);

    expect(result).to.be.deep.equal(happyQueryById)
  });


  it('Test findById do product passando um id de um produto não existente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined)
    
    const result = await productsService.findById(9999);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal('Product not found')
    
  });

it('Testando findById do product passando um id invalido', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined)
    
  const result = await productsService.findById('a');
  
    expect(result.type).to.be.equal('INVALID_VALUE');
    expect(result.message).to.be.deep.equal('"id" must be a number')
  })

  afterEach(sinon.restore);
});