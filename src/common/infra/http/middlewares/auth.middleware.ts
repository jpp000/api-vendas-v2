import { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'tsyringe'
import { TokenProvider } from '@/users/domain/providers/token.provider'

@injectable()
export class AuthMiddleware {
  constructor(
    @inject('TokenProvider')
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.cookies.Authentication || req.headers.authorization?.split(' ')[1]

      if (!token) {
        return res.status(401).json({ message: 'Token not provided' })
      }

      const decoded = await this.tokenProvider.verify(token)

      if (!decoded || decoded.user.invalid) {
        return res.status(401).json({ message: 'Invalid or expired token' })
      }

      req.user = decoded.user

      next()
    } catch (error) {
      console.error('Authentication error:', error)
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}
