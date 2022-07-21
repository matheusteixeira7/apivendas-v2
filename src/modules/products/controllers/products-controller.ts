import { Request, Response } from 'express'
import { CreateProductService, DeleteProductService, GetAllProductsService, GetProductService, UpdateProductService } from '../services'

export class ProductsController {
  async getAll (request: Request, response: Response): Promise<Response> {
    const getAllProducts = new GetAllProductsService()
    const products = await getAllProducts.execute()

    return response.status(200).json(products)
  }

  async getById (request: Request, response: Response): Promise<Response> {
    const getByIdProduct = new GetProductService()

    const { id } = request.params

    const product = await getByIdProduct.execute({ id })

    return response.status(200).json(product)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const createProduct = new CreateProductService()

    const { name, price, quantity } = request.body

    const product = await createProduct.execute({ name, price, quantity })

    return response.status(201).json(product)
  }

  async update (request: Request, response: Response): Promise<Response> {
    const updateProduct = new UpdateProductService()

    const { id } = request.params
    const { name, price, quantity } = request.body

    const product = await updateProduct.execute({ id, name, price, quantity })

    return response.status(201).json(product)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const deleteProduct = new DeleteProductService()

    const { id } = request.params

    await deleteProduct.execute({ id })

    return response.status(204).send()
  }
}
