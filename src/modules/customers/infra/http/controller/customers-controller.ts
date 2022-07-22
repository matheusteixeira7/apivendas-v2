import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCustomerService, DeleteCustomerService, GetCustomerService, ListCustomersService, UpdateCustomerService } from '../../../services'

export class CustomersController {
  async getAll (request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomersService)
    const customers = await listCustomers.execute()

    return response.status(200).json(customers)
  }

  async getById (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const getCustomerById = container.resolve(GetCustomerService)

    const customer = await getCustomerById.execute({ id })

    return response.json(customer)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createCustomer = container.resolve(CreateCustomerService)

    const customer = await createCustomer.execute({ name, email })

    return response.status(201).json(customer)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email } = request.body

    const updateCustomer = container.resolve(UpdateCustomerService)

    const customer = await updateCustomer.execute({ id, name, email })

    return response.status(201).json(customer)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCustomer = container.resolve(DeleteCustomerService)

    await deleteCustomer.execute({ id })

    return response.status(204).send()
  }
}
