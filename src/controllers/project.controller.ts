// import {Request, Response } from 'express'
// import { queryClient } from '../query/prisma'

// export const getProjects = async (req: Request, res: Response) => {
//   const projects = await queryClient.project.findMany()
//   return res.status(200).send({ project: projects })
// }

// export const createProject = async (req: Request, res: Response) => {
//   const { name } = req.body
//   const projects = queryClient.project.create({
//     data: {
//       name,
//       updatedAt: null,
//       deletedAt: null,

//     }
//   })
//   return res.status(200).send({ project: projects })
// }