import { isAuthenticated } from '@shared/infra/http/middlewares/is-authenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { ProductsController } from '../controllers/products-controller'

export const productsRouter = Router()
const productsController = new ProductsController()

productsRouter.use(isAuthenticated)

productsRouter.get('/', productsController.getAll)

productsRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), productsController.getById)

productsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productsController.create)

productsRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required()
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), productsController.update)

productsRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), productsController.delete)
