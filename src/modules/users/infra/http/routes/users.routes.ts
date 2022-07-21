import uploadConfig from '@config/upload'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import multer from 'multer'
import { isAuthenticated } from '../../../../../shared/infra/http/middlewares/is-authenticated'
import { UserAvatarController } from '../controllers/user-avatar-controller'
import { UsersController } from '../controllers/users-controller'

export const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create)

usersRouter.get('/', isAuthenticated, usersController.getAll)

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)
