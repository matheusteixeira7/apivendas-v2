import { Request, Response } from 'express'
import { SendForgotPasswordEmailService } from '../../../services/send-forgot-password-email-service'

export class ForgotPasswordController {
  async create (request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService()

    await sendForgotPasswordEmail.execute({ email })

    return response.status(204).json()
  }
}
