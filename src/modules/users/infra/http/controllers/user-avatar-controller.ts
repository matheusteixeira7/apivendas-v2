import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { UpdateUserAvatarService } from '../../../services/update-user-avatar-service'

export class UserAvatarController {
  async update (request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService()

    const user = await updateAvatar.execute({
      userId: request.user!.id,
      avatarFileName: request.file!.filename
    })

    return response.status(201).json(instanceToInstance(user))
  }
}
