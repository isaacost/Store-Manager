const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db/connection');

chai.use(sinonChai);

const mock = require('./mocks/products.models.mock');

describe('Testando models do products', function () {
  it('Testa findAll do product', async function () {
    sinon.stub(connection, 'execute').resolves([mock.allProducts]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(mock.allProducts);
  });

  it('Test findById do product', async function () {
    sinon.stub(connection, 'execute').resolves([mock.findProduct]);

    const result = await productsModel.findById(1);

    expect(result).to.deep.equal(mock.findProduct);
  });

  it('Testando create do product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await productsModel.create('ProductX')

    expect(result).to.be.equal(3)
  });

  it('Testando se um produto é atualizado corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);

    const result = await productsModel.update(1, 'ProductZ')

    expect(result).to.be.equal(1)
  });

  afterEach(sinon.restore);
});