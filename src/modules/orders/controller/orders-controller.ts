import { Request, Response } from 'express'
import { CreateOrderService } from '../services/create-order-service'
import { GetOrderService } from '../services/get-order-service'

export class OrdersController {
  async getById (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const getOrder = new GetOrderService()
    const order = await getOrder.execute(id)
    return response.json(order)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body
    const createOrder = new CreateOrderService()

    const order = await createOrder.execute({ customerId, products })

    return response.json(order)
  }
}
