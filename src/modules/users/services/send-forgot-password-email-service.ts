import { EtherealMail } from '@config/mail'
import { AppError } from '@shared/errors/AppError'
import path from 'path'
import { getCustomRepository } from 'typeorm'
import { UsersRepository, UserTokensRepository } from '../infra/typeorm/repositories'

interface IRequest {
  email: string
}

export class SendForgotPasswordEmailService {
  async execute ({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository)
    const userTokensRepository = getCustomRepository(UserTokensRepository)

    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const userToken = await userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs'
    )

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${userToken.token}`
        }
      }
    })
  }
}
