import { EntityRepository, In, Repository } from 'typeorm'
import { Product } from '../entities'

interface IFindProducts {
  id: string
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByName (name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { name }
    })

    return product
  }

  async findAllByIds (products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id)

    const existsProducts = await this.find({
      where: {
        id: In(productsIds)
      }
    })

    return existsProducts
  }
}
