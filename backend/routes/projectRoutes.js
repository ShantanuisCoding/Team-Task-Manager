import express from "express";
import {
  createProject,
  getProjects,
  addMember,
  removeMember
} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/:id/add-member", authMiddleware, addMember);
router.post("/:id/remove-member", authMiddleware, removeMember);

export default router;