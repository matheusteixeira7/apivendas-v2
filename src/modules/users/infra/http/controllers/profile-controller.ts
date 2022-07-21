import { AppError } from '@shared/errors/AppError'
import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { GetUserService } from '../../../services/get-user-service'
import { UpdateUserService } from '../../../services/update-user-service'

export class ProfileController {
  async get (request: Request, response: Response): Promise<Response> {
    const getUser = new GetUserService()

    if (!request.user) {
      throw new AppError('User not found')
    }

    const userId = request.user.id

    const user = await getUser.execute({ userId })

    return response.json(instanceToInstance(user))
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body

    if (!request.user) {
      throw new AppError('User not found')
    }

    const userId = request.user.id

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute({
      userId,
      name,
      email,
      password,
      oldPassword
    })

    return response.json(instanceToInstance(user))
  }
}
