import express from "express";
import {
  addBooksRoutes,
  getBooksRoutes,
  getBooksRoutesId,
  updateBooksRoutes,
  deleteBooksRoutes,
} from "../controller/controller.js";

const router = express.Router();

router.post("/", addBooksRoutes);
router.get("/", getBooksRoutes);
router.get("/:id", getBooksRoutesId);
router.put("/:id", updateBooksRoutes);
router.delete("/:id", deleteBooksRoutes);

export default router;
