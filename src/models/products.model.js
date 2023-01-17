const connection = require('./db/connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);

  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);

  return result;
};

const create = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [{ changedRows }] = await connection.execute(query, [name, id]);
  return changedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  const [deletedProduct] = await connection.execute(query, [id]);
  return deletedProduct;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};