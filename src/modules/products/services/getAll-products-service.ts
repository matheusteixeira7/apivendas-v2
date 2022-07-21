import { RedisCache } from '@shared/cache/redis-cache'
import { getCustomRepository } from 'typeorm'
import { Product } from '../infra/typeorm/entities'
import { ProductRepository } from '../infra/typeorm/repositories/products-repository'

export class GetAllProductsService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute (): Promise<Product[]> {
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST')

    if (!products) {
      products = await this.productRepository.find()

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products
  }
}
