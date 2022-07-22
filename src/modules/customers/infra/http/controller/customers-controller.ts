import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCustomerService, DeleteCustomerService, GetAllCustomersService, GetCustomerService, UpdateCustomerService } from '../../../services'

export class CustomersController {
  async getAll (request: Request, response: Response): Promise<Response> {
    const getAllCustomers = new GetAllCustomersService()
    const customers = await getAllCustomers.execute()

    return response.status(200).json(customers)
  }

  async getById (request: Request, response: Response): Promise<Response> {
    const getCustomerById = new GetCustomerService()

    const { id } = request.params

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
    const updateCustomer = new UpdateCustomerService()

    const { id } = request.params
    const { name, email } = request.body

    const customer = await updateCustomer.execute({ id, name, email })

    return response.status(201).json(customer)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const deleteCustomer = new DeleteCustomerService()

    const { id } = request.params

    await deleteCustomer.execute({ id })

    return response.status(204).send()
  }
}
