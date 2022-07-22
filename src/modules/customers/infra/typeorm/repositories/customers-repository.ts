import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { getRepository, Repository } from 'typeorm'
import { Customer } from '../entities/customer'
import { ICreateCustomer } from './../../../domain/models/ICreateCustomer'

export class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>

  constructor () {
    this.ormRepository = getRepository(Customer)
  }

  async create ({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email
    })

    await this.ormRepository.save(customer)

    return customer
  }

  async save (customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer)
    return customer
  }

  async findByName (name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { name }
    })

    return customer
  }

  async findById (id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { id }
    })

    return customer
  }

  async findByEmail (email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { email }
    })

    return customer
  }
}
