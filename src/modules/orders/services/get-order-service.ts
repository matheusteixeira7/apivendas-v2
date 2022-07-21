import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Order } from '../infra/typeorm/entities/order'
import { OrdersRepository } from '../infra/typeorm/repositories/orders-repository'

export class GetOrderService {
  private ordersRepository = getCustomRepository(OrdersRepository)

  async execute (id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Could not find any order with the given id')
    }

    return order
  }
}
