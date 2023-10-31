import express from 'express'
import { getContents, createContent, updateContent, deleteContent, purgeDeletedContents } from '../controllers/content.controller';

const router = express.Router()

router.get('/', getContents)
router.post('/', createContent)
router.patch('/:id', updateContent)
router.delete('/purge', purgeDeletedContents)
router.delete('/:id', deleteContent)


export default router;