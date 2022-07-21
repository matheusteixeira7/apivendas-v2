import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { OrdersController } from '../controller/orders-controller'

export const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(isAuthenticated)

ordersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ordersController.getById
)

ordersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }),
  ordersController.create
)
