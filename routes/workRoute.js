import express from "express"
import {createWork,deleteWork,updateWork,showStats,getAllWork } from "../controllers/workController.js";
const router=express.Router();

router.route("/").post(createWork).get(getAllWork)
router.route("/stats").get(showStats)
router.route("/:id").delete(deleteWork).patch(updateWork)

export const workRouter=router;