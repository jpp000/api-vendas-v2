export interface TokenPayload {
  user: {
    id: string
    name: string
    email: string
    invalid: boolean
  }
}
