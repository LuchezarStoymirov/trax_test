import { Router } from "express";
import { getEntries, createEntry, getSpecificEntry, editEntry, deleteEntry } from "../controllers/entryController.js";

const router = Router();

router.route('/').get(getEntries).post(createEntry);
router.route('/:id').get(getSpecificEntry).patch(editEntry).delete(deleteEntry);

export default router;