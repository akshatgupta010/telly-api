import { z } from "zod";

const shape = {
  name: z.string().trim().min(1),
  channel: z.string().trim().min(1),
  genre: z.string().trim().min(1),
  rating: z.number().int().min(1).max(5),
  explicit: z.boolean(),
};

export const createShowSchema = z.object(shape).strict();

export const updateShowSchema = z
  .object(shape)
  .partial()
  .strict()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field is required",
  });