import { isAuthenticated } from '@shared/http/middlewares/is-authenticated'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { ProfileController } from '../controllers/profile-controller'

export const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(isAuthenticated)

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required()
      }),
      oldPassword: Joi.string()
    }
  }),
  profileController.update)

profileRouter.get('/', profileController.get)
