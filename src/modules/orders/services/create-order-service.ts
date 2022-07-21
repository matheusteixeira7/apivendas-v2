import { CustomersRepository } from '@modules/customers/typeorm/repositories'
import { ProductRepository } from '@modules/products/typeorm/repositories/products-repository'
import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Order } from '../typeorm/entities/order'
import { OrdersRepository } from '../typeorm/repositories/orders-repository'

interface IProducts {
  id: string
  quantity: number
}

interface IRequest {
  customerId: string
  products: IProducts[]
}

export class CreateOrderService {
  private ordersRepository = getCustomRepository(OrdersRepository)
  private customersRepository = getCustomRepository(CustomersRepository)
  private productsRepository = getCustomRepository(ProductRepository)

  async execute ({ customerId, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customerId)

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id')
    }

    const existsProducts = await this.productsRepository.findByIds(products)

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids')
    }

    const existsProductsIds = existsProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find any product ${checkInexistentProducts[0].id}`)
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    )

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
    }

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }))

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    })

    const { ordersProducts } = order

    const updatedProductsQuantity = ordersProducts.map(orderProduct => ({
      id: orderProduct.productId,
      quantity: existsProducts.filter(p => p.id === orderProduct.productId)[0].quantity - orderProduct.quantity
    }))

    await this.productsRepository.save(updatedProductsQuantity)

    return order
  }
}
