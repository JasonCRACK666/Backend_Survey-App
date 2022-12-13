declare namespace Express {
  interface Request {
    user?: {
      id: string
      username: string
      is_admin: boolean
    }
  }
}
