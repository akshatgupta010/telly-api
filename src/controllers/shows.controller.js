import * as Shows from "../models/shows.model.js";

export const list = async (req, res) => {
  res.json(await Shows.getAll());
};

export const get = async (req, res) => {
  const show = await Shows.getById(req.showId);
  if (!show) return res.status(404).json({ error: "Show not found" });
  res.json(show);
};

export const create = async (req, res) => {
  const show = await Shows.create(req.body);
  res.status(201).json(show);
};

export const update = async (req, res) => {
  const show = await Shows.update(req.showId, req.body);
  if (!show) return res.status(404).json({ error: "Show not found" });
  res.json(show);
};

export const remove = async (req, res) => {
  const show = await Shows.remove(req.showId);
  if (!show) return res.status(404).json({ error: "Show not found" });
  res.json(show);
};