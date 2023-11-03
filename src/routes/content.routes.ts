import express from 'express'
import { getContents, createContent, updateContent, deleteContent, purgeDeletedContents, deleteAllContents } from '../controllers/content.controller';
import {validateContentExistence} from "../controllers/content.middleware";

const router = express.Router()

router.get('/', getContents)
router.post('/', createContent)
router.patch('/:id', validateContentExistence, updateContent)
router.delete('/delete-all', deleteAllContents)
router.delete('/purge', purgeDeletedContents)
router.delete('/:id', validateContentExistence, deleteContent)


export default router;