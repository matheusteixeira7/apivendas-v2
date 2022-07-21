import { Customer } from '@modules/customers/infra/typeorm/entities/customer'
import { EntityRepository, Repository } from 'typeorm'
import { Order } from '../entities/order'

interface IProduct {
  productId: string
  price: number
  quantity: number
}

interface IRequest {
  customer: Customer
  products: IProduct[]
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async findById (id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['customer', 'ordersProducts']
    })

    return order
  }

  async createOrder ({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      ordersProducts: products
    })

    await this.save(order)

    return order
  }
}
