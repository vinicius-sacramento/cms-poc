import { queryClient } from '../query/prisma'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createContent = async (req: FastifyRequest, res: FastifyReply) => {
  const { key, value } = req.body

  if (!key || !value) {
    return res.status(400).send({ message: "You need to pass a key and value" })
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

// export const getContents = async (req: FastifyRequest, res: FastifyReply) => {
export const getContents = async (req: FastifyRequest, res: FastifyReply) => {
  const { showDeleted } = req.query

  const filterByDeleted = showDeleted === 'true' ? {} : { deletedAt: null }

  const contents = await queryClient.content.findMany({ where: filterByDeleted })
  return res.status(200).send({ contents: contents })
}

export const updateContent = async (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params
  const { value, key } = req.body

  const content = await queryClient.content.findUnique({
    where: {
      id,
      deletedAt: null,
    }
  })

  if (!content) return res.status(404).send({ message: "This content does not exist" })

  const payload = { ...content, ...{ value, key } }

  if (JSON.stringify(payload) === JSON.stringify(content)) return res.status(400).send({
    message: "You send the same old value for key or value, please send a new value."
  })

  const updatedContent = await queryClient.content.update({
    where: {
      id: content.id
    },
    data: {
      key: payload.key,
      value: payload.value,
      updatedAt: new Date().toISOString()
    }
  })

  return res.status(200).send(updatedContent)
}

export const deleteContent = async (req: FastifyRequest, res: FastifyReply) => {
  const { id } = req.params

  if (!id) return res.status(400).send({ message: "You must pass the id" })

  const content = await queryClient.content.findUnique({
    where: {
      id,
      deletedAt: null,
    }
  })

  if (!content) return res.status(404).send({ message: "This content does not exist" })

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

export const deleteAllContents = async (req: FastifyRequest, res: FastifyReply) => {
  const deletedContent = await queryClient.content.deleteMany()
  return res.status(200).send(deletedContent)
}

export const purgeDeletedContents = async (req: FastifyRequest, res: FastifyReply) => {

  const deletedContent = await queryClient.content.deleteMany({
    where: {
      NOT: {
        deletedAt: null
      }
    },
  })

  return res.status(200).send(deletedContent)
}