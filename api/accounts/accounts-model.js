const db = require("../../data/db-config");

const getAll = async () => {
  const result = await db("accounts");
  return result;
};

const getById = async (id) => {
  const result = await db("accounts").where("id", id).first();
  return result;
};

const create = async (newAccount) => {
  const [id] = await db("accounts").insert(newAccount);
  const account = await getById(id);
  return account;
};

const updateById = async (id, account) => {
  await db("accounts").update(account).where("id", id);
  return getById(id);
};

const deleteById = async (id) => {
  const result = await db("accounts").del().where("id", id);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
