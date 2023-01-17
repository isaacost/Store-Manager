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

  afterEach(sinon.restore);
});