import { Request, Response } from 'express'
import { ResetPasswordService } from '../services/reset-password-service'

export class ResetPasswordController {
  async create (request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body

    const resetForgotPasswordEmail = new ResetPasswordService()

    await resetForgotPasswordEmail.execute({ token, password })

    return response.status(204).json()
  }
}
