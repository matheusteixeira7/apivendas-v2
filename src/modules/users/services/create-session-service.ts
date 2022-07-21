import authConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

export class CreateSessionService {
  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return { user, token }
  }
}
