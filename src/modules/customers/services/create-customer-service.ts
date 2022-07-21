import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../infra/typeorm/entities/customer'
import { CustomersRepository } from '../infra/typeorm/repositories'

interface IRequest {
  name: string
  email: string
}

export class CreateCustomerService {
  async execute ({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const emailExists = await customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email already exists', 400)
    }

    const customer = customersRepository.create({
      name,
      email
    })

    await customersRepository.save(customer)

    return customer
  }
}
