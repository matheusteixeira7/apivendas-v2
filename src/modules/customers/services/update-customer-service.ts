import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'
import { Customer } from '../infra/typeorm/entities/customer'

interface IRequest {
  id: string
  name: string
  email: string
}

@injectable()
export class UpdateCustomerService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute ({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found')
    }

    const customerEmailExists = await this.customersRepository.findByEmail(email)

    if (customerEmailExists && customerEmailExists.id !== id) {
      throw new AppError('Email already in use')
    }

    customer.name = name
    customer.email = email

    await this.customersRepository.save(customer)

    return customer
  }
}
