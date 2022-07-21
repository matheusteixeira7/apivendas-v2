import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateUserService, GetAllUsersService } from '../services'

export class UsersController {
  async getAll (request: Request, response: Response): Promise<Response> {
    const getAllUsers = new GetAllUsersService()

    const users = await getAllUsers.execute()

    return response.status(200).json(instanceToInstance(users))
  }

  async create (request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService()

    const { name, email, password } = request.body

    const user = await createUser.execute({ name, email, password })

    return response.status(201).json(instanceToInstance(user))
  }
}
