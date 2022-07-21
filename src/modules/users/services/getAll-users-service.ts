import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities'
import { UsersRepository } from '../typeorm/repositories'

export class GetAllUsersService {
  async execute (): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)
    const users = await usersRepository.find()

    return users
  }
}
