import { AppError } from './app.error'

export class InvalidPasswordError extends AppError {
  constructor(message: string) {
    super(message, 401)
    this.name = 'InvalidPasswordError'
  }
}
