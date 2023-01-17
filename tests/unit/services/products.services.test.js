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
  });

  it('Testando creat do produt passando um nome com mais de 5 caracteres', async function () {
    sinon.stub(productsModel, 'create').resolves(3);
    const result = await productsService.create('ProdutoX');
    
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal({ id: 3, name: 'ProdutoX' })
  });

  it('Testando creat do product passando um nome com menos de 5 caracteres', async function () {
    sinon.stub(productsModel, 'create').resolves(3)
    const result = await productsService.create('a')

    expect(result.type).to.be.equal('INVALID_NAME');
    expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long')

  });

  it('Testando update do product passando um nome com mais de 5 caracteres e com id correto', async function () {
    sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Mjonir' });
    sinon.stub(productsModel, 'update').resolves(1);
    const result = await productsService.update(1, 'Manopla do Destino');
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal({ id: 1, name: 'Manopla do Destino' });
  });

  it('Testando update do product passando um nome com menos de 5 caracteres', async function () {
    sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Mjonir' });
    sinon.stub(productsModel, 'update').resolves(1);

    const result = await productsService.update(1, 'a')

    expect(result.type).to.be.equal('INVALID_NAME');
    expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });

  afterEach(sinon.restore);
});