import { AppError } from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { CustomersRepository } from '../typeorm/repositories'

interface IRequest {
  id: string
}

export class DeleteCustomerService {
  private customersRepository = getCustomRepository(CustomersRepository)

  async execute ({ id }: IRequest): Promise<void | undefined> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError('Customer not found', 404)
    }

    await this.customersRepository.remove(customer)
  }
}
