import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities'
import { UsersRepository } from '../infra/typeorm/repositories'

interface IRequest {
  userId: string

}

export class GetUserService {
  async execute ({ userId }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}
