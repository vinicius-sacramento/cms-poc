import express from 'express'
import { getContents, createContent, deleteContent } from '../controllers/content.controller';

const router = express.Router()

router.get('/', getContents)
router.post('/create', createContent)
router.delete('/delete/:id', deleteContent)

export default router;