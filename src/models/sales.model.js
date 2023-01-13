const connection = require('./db/connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [result] = await connection.execute(query);

  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';
  const [result] = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
};