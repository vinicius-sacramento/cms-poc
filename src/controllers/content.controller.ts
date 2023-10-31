import { Request, Response } from 'express'
import { queryClient } from '../query/prisma'
import { randomUUID } from 'crypto'

export const createContent = async (req: Request, res: Response) => {
  const { name, content } = req.body

  if(!name || !content){
    return res.status(400).send({message: "You need to pass a name and content"})
  }

  const payload = {
    contentId: randomUUID(),
    name,
    content,
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

  console.log(contents)

  return res.status(200).send({ ...contents })
}

export const getContents = async (req: Request, res: Response) => {
  const contents = await queryClient.content.findMany({where: {deletedAt: null}})
  return res.status(200).send({ contents: contents })
}

export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) return res.status(400).send({message: "You must pass the contentId"})

  const contentExist = await queryClient.content.findUnique({where: {contentId: id}})

  if (!contentExist) return res.status(404).send({ message: "Invalid contentId" })

  const deletedContent = await queryClient.content.update({
    where: {
      contentId: id,
    },
    data: {
      deletedAt: new Date().toISOString()
    }
  })


  return res.status(200).send(deletedContent)
}