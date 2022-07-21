import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CustomersController } from '../controller/customers-controller'

export const customersRouter = Router()
const productsController = new CustomersController()

customersRouter.use(isAuthenticated)

customersRouter.get('/', productsController.getAll)

customersRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }), productsController.getById
)

customersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }
  }),
  productsController.create
)

customersRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  productsController.update
)

customersRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }), productsController.delete
)
