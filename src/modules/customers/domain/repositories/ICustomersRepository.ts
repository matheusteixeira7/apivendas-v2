import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { ICreateCustomerDTO } from '@modules/customers/infra/http/dtos/create-customer-dto'

export interface ICustomersRepository {
  findByName (name: string): Promise<ICustomer | undefined>
  findById (id: string): Promise<ICustomer | undefined>
  findByEmail (email: string): Promise<ICustomer | undefined>
  create(data: ICreateCustomerDTO): Promise<ICustomer>
  save(customer: ICustomer): Promise<ICustomer>
  list (): Promise<ICustomer[]>
  remove (customer: ICustomer): Promise<void>
}
