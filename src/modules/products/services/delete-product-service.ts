import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../infra/typeorm/repositories/products-repository'

interface IRequest {
  id: string
}

export class DeleteProductService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute ({ id }: IRequest): Promise<void | undefined> {
    const product = await this.productRepository.findOne(id)
    const redisCache = new RedisCache()

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await this.productRepository.remove(product)
  }
}
