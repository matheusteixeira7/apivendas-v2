import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

interface IRequest {
  id: string
}

@injectable()
export class DeleteCustomerService {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute ({ id }: IRequest): Promise<void | undefined> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found', 404)
    }

    await this.customersRepository.remove(customer)
  }
}
