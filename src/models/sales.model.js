const connection = require('./db/connection');

const createSale = async () => {
  const query1 = 'INSERT INTO sales (date) VALUES(NOW())';
  const [{ insertId }] = await connection.execute(query1);
  return insertId;
};

const create = async (body) => {
  const query2 = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES( ?, ?, ? )';
  const ids = body.map(({ productId }) => productId);
  const placeHolders = ids.map((_e) => '?').join(', ');
  const query3 = `SELECT id FROM products WHERE id IN (${placeHolders})`;
  const [productsAchados] = await connection.execute(query3, ids);
  const v = productsAchados.map(({ id }) => Number(id));
  const verificacao = ids.every((e) => v.includes(e));
  if (!verificacao) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const idSale = await createSale();
  const sales = await Promise.all(
    body.map(async (e) => {
      const { productId, quantity } = e;
     await connection.execute(query2, [idSale, productId, quantity]);
      return e;
    }),
  );
  const result = { id: idSale, itemsSold: sales };
  return { type: null, message: result };
};

const findAll = async () => {
  const query = `SELECT sale_id, date, product_id, quantity FROM sales sa
INNER JOIN sales_products s
ON s.sale_id = sa.id;`;
  const [sales] = await connection.execute(query);
  return sales.map(
    ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  );
};

const findById = async (id) => {
  const query = `SELECT sale_id, date, product_id, quantity FROM sales sa
INNER JOIN sales_products s
ON s.sale_id = sa.id
HAVING sale_id = ?;`;
  const [sale] = await connection.execute(query, [id]);
  if (!sale || sale.length === 0) return undefined;
  const result = sale.map(({ date, product_id: productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
};