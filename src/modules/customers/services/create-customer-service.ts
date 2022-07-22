import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'
import { ICreateCustomerDTO } from '../infra/http/dtos/create-customer-dto'

@injectable()
export class CreateCustomerService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute ({ name, email }: ICreateCustomerDTO): Promise<ICustomer> {
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
