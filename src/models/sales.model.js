const connection = require('./db/connection');

// const findAll = async () => {
//   const query = 'SELECT * FROM StoreManager.sales';
//   const [result] = await connection.execute(query);

//   return result;
// };

// const findById = async (id) => {
//   const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
//   const [result] = await connection.execute(query, [id]);

//   return result;
// };

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

module.exports = {
  // findAll,
  // findById,
  create,
};