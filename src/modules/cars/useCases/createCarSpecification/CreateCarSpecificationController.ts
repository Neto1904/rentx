import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { specificationId } = request.body

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    )
    const car = await createCarSpecificationUseCase.execute({
      carId: id,
      specificationId,
    })

    return response.json(car)
  }
}

export { CreateCarSpecificationController }
