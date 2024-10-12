import express from "express"
import { getList, createList } from "../controllers/list.controller.js";

const router = express.Router();


router.get('/getList', getList)
router.post('/createList', createList)

export default router;