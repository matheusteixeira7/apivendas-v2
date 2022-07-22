import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'

@injectable()
export class ListCustomersService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute (): Promise<ICustomer[]> {
    const customers = await this.customersRepository.list()

    return customers
  }
}
