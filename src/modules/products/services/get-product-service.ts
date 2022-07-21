import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  id: string
}

export class GetProductService {
  private productRepository = getCustomRepository(ProductRepository)

  async execute ({ id }: IRequest): Promise<Product | undefined> {
    const product = await this.productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    return product
  }
}
