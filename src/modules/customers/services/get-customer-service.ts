import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Customer } from '../infra/typeorm/entities/customer'
import { CustomersRepository } from '../infra/typeorm/repositories'

interface IRequest {
  id: string
}

@injectable()
export class GetCustomerService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ) {}

  async execute ({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found')
    }

    return customer
  }
}
