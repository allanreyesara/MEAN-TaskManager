import express from "express"
import {getList, createList, updateList, deleteList} from "../controllers/list.controller.js";

const router = express.Router();


router.get('/getList', getList)
router.post('/createList', createList)
router.put('/updateList/:id', updateList)
router.delete('/deleteList/:id', deleteList)

export default router;