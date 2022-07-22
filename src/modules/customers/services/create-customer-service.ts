import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'
import { ICreateCustomer } from './../domain/models/ICreateCustomer'

@injectable()
export class CreateCustomerService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute ({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email already exists', 400)
    }

    const customer = await this.customersRepository.create({
      name,
      email
    })

    return customer
  }
}
