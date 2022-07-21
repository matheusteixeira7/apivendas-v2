import uploadConfig from '@config/upload'
import { AppError } from '@shared/errors/AppError'
import fs from 'fs'
import path from 'path'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities'
import { UsersRepository } from './../typeorm/repositories/users-repository'

interface IRequest {
  userId: string
  avatarFileName: string
}

export class UpdateUserAvatarService {
  async execute ({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findById(userId)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await userRepository.save(user)

    return user
  }
}
