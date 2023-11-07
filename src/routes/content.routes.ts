
import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { getContents, createContent, updateContent, deleteContent, purgeDeletedContents, deleteAllContents } from '../controllers/content.controller';

export const contentRoutes = (app: FastifyInstance) => {
  app.register((app: FastifyInstance, _opts: FastifyRegisterOptions<any>, done: Function) => {
    app.get('/', getContents)
    app.post('/', createContent)
    app.patch('/:id', updateContent)
    app.delete('/delete-all', deleteAllContents)
    app.delete('/purge', purgeDeletedContents)
    app.delete('/:id', deleteContent)
    done()
  }, {prefix: "/contents"})
}