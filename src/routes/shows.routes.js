import { Router } from "express";
import * as c from "../controllers/shows.controller.js";
import { validate, parseId } from "../middleware/validate.js";
import { createShowSchema, updateShowSchema } from "../validators/show.schema.js";

const router = Router();

router.get("/", c.list);
router.get("/:id", parseId, c.get);
router.post("/", validate(createShowSchema), c.create);
router.put("/:id", parseId, validate(updateShowSchema), c.update);
router.delete("/:id", parseId, c.remove);

export default router;