import { dataSource } from '@/common/infra/typeorm'
import { CreateProductUseCase } from '@/products/application/usecases/create-product.usecase'
import { ProductsRepository } from '@/products/domain/repositories/interfaces/products.repository'
import { ProductsTypeormRepository } from '@/products/infra/typeorm/repository/products-typeorm.repository'
import { container } from 'tsyringe'
import { Product } from '../typeorm/entities/product.entity'
import { Repository } from 'typeorm'

container.registerSingleton<ProductsRepository>(
  'ProductsRepository',
  ProductsTypeormRepository,
)

container.registerSingleton<CreateProductUseCase.UseCase>(
  'CreateProductUseCase',
  CreateProductUseCase.UseCase,
)

container.register<Repository<Product>>('ProductsDefaultTypeormRepository', {
  useFactory: () => dataSource.getRepository(Product),
})
