import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../infra/typeorm/entities/customer'
import { CustomersRepository } from '../infra/typeorm/repositories'

interface IRequest {
  id: string
}

export class GetCustomerService {
  async execute ({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)
    const customer = await customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found')
    }

    return customer
  }
}
