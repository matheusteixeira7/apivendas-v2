import { EntityRepository, Repository } from 'typeorm'
import { UserToken } from './../entities/user-token'

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  async findByToken (token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: { token }
    })

    return userToken
  }

  async generate (userId: string): Promise<UserToken> {
    const userToken = await this.create({
      userId
    })

    await this.save(userToken)

    return userToken
  }
}
