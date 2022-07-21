import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface IRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute ({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const emailExists = await userRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email already exists', 400)
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user)

    return user
  }
}
