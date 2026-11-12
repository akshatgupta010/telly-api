import db from "../../db/knex.js";

export const getAll = () => db("shows").select().orderBy("id");

export const getById = (id) => db("shows").where({ id }).first();

export const create = async (show) => {
  const [row] = await db("shows").insert(show).returning("*");
  return row;
};

export const update = async (id, updates) => {
  const [row] = await db("shows").where({ id }).update(updates).returning("*");
  return row;
};

export const remove = async (id) => {
  const [row] = await db("shows").where({ id }).del().returning("*");
  return row;
};