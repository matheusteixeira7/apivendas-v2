import { customersRouter } from '@modules/customers/infra/http/routes'
import { ordersRouter } from '@modules/orders/infra/http/routes'
import { productsRouter } from '@modules/products/infra/http/routes'
import { passwordRouter, profileRouter, sessionRouter, usersRouter } from '@modules/users/infra/http/routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
