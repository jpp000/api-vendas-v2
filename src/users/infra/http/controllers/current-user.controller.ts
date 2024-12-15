import { Request, Response } from 'express'

export async function currentUserController(req: Request, res: Response) {
  try {
    return res.status(200).json(req.user)
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      message: 'Unautorized, user is not logged in',
    })
  }
}
