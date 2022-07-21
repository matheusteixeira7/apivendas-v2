import { customersRouter } from '@modules/customers/routes'
import { ordersRouter } from '@modules/orders/routes'
import { productsRouter } from '@modules/products/routes'
import { passwordRouter, profileRouter, sessionRouter, usersRouter } from '@modules/users/routes'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/session', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
