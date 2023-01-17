const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;
const { productsService} = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { happyQueryAll, happyQueryById } = require('./mocks/products.controllers.mock');

chai.use(sinonChai);

describe('Testando a camada controller de products', function () {
  it('Testando findAll', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll').resolves(happyQueryAll);

    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(happyQueryAll);
  });

  it('Testando findByID com id válido', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({ type: null, message: happyQueryById });

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    // expect(res.json).to.have.been.calledWith(happyQueryById);
  })

  it('Testando findById com id inválido', async function () {
    const req = { params: { id: 9 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  });

  it('Testando função create com name válido', async function () {
    const req = { body: { name: 'ProdutoX' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'create').resolves({ type: null, message: { id: 1, name: 'ProdutoX' } });

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'ProdutoX' });
  });

  it('Testando função create com name inválido', async function () {
    const req = { body: { name: 'a' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'create').resolves({ type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long' });

    await productsController.create(req, res);

    // expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' })
  });


  afterEach(sinon.restore);
});