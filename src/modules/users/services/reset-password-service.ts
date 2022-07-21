import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { addHours, isAfter } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import { UserTokensRepository } from '../infra/typeorm/repositories/user-tokens-repository'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface IRequest {
  token: string
  password: string
}

export class ResetPasswordService {
  async execute ({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const userToken = await userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists.')
    }

    const user = await userRepository.findById(userToken.userId)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.createdAt
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8)

    await userRepository.save(user)
  }
}
