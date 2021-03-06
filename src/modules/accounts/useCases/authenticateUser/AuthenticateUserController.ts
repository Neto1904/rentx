import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AunthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const { user, token, refreshToken } = await authenticateUserUseCase.execute(
      {
        email,
        password,
      }
    )
    return response.status(200).json({ user, token, refreshToken })
  }
}

export { AuthenticateUserController }
