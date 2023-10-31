import { Request, Response } from 'express'
import { queryClient } from '../query/prisma'
import { randomUUID } from 'crypto'

export const createContent = async (req: Request, res: Response) => {
  const { key, value } = req.body

  if (!key || !value){
    return res.status(400).send({message: "You need to pass a key and value"})
  }

  const payload = {
    id: randomUUID(),
    key,
    value,
    createdAt: new Date().toISOString(),
    archived: false,
    deletedAt: null,
    updatedAt: null,
  }

  const contents = await queryClient.content.create({
    data: {
      ...payload
    }
  })

  return res.status(200).send({ ...contents })
}

export const getContents = async (req: Request, res: Response) => {
  const { showDeleted } = req.query

  const filterByDeleted = !!showDeleted ? {} : {deletedAt: null}

  const contents = await queryClient.content.findMany({ where: filterByDeleted })
  return res.status(200).send({ contents: contents })
}

export const updateContent = async (req: Request, res: Response) => {
  const { value, key } = req.body
  const { currentContent } = req.app.locals
  const payload = { ...currentContent, ...{ value, key } }

  if (JSON.stringify(payload) === JSON.stringify(currentContent)) return res.status(400).send({
    message: "You send the same old value for key or value, please send a new value." 
  })

  const updatedContent = await queryClient.content.update({where: {
    id: currentContent.id
  },
  data: {
    key: payload.key,
    value: payload.value,
  }
})

  return res.status(200).send(updatedContent)
}

export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) return res.status(400).send({message: "You must pass the id"})

  const deletedContent = await queryClient.content.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date().toISOString()
    }
  })
  return res.status(200).send(deletedContent)
}

export const purgeDeletedContents = async (req: Request, res: Response) => {

  const deletedContent = await queryClient.content.deleteMany({
    where: {
      NOT: {
        deletedAt: null
      } 
    },
  })

  return res.status(200).send(deletedContent)
}