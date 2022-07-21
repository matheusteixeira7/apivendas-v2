import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities'
import { UsersRepository } from '../infra/typeorm/repositories'

export class GetAllUsersService {
  async execute (): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository)
    const users = await usersRepository.find()

    return users
  }
}
