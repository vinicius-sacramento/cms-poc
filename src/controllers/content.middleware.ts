import {queryClient} from "../query/prisma";
import {Request, Response, NextFunction} from "express";

export const validateContentExistence = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const content = await queryClient.content.findUnique({where: {
            id,
            deletedAt: null,
        }})

    if(!content) return res.status(404).send({message: "This content does not exist"})

    req.app.locals.currentContent = content

    return next()
}