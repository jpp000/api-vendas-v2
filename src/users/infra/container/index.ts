import { container } from 'tsyringe'
import { Repository } from 'typeorm'
import { User } from '../typeorm/entities/user.entity'
import { dataSource } from '@/common/infra/typeorm'
import { UsersTypeormRepository } from '../typeorm/repositories/users-typeorm.repository'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { HashProvider } from '@/users/domain/providers/hash.provider'
import { BcryptHashProvider } from '../providers/bcrypt-hash.provider'
import { CreateUserUseCase } from '@/users/application/usecases/create-user.usecase'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { SearchUsersUseCase } from '@/users/application/usecases/search-users.usecase'

container.registerSingleton<HashProvider>('HashProvider', BcryptHashProvider)

container.registerSingleton<UsersRepository>(
  'UsersTypeormRepository',
  UsersTypeormRepository,
)

container.registerSingleton<CreateUserUseCase.UseCase>(
  'CreateUserUseCase',
  CreateUserUseCase.UseCase,
)

container.registerSingleton<GetUserUseCase.UseCase>(
  'GetUserUseCase',
  GetUserUseCase.UseCase,
)

container.registerSingleton<SearchUsersUseCase.UseCase>(
  'SearchUsersUseCase',
  SearchUsersUseCase.UseCase,
)

container.register<Repository<User>>('UsersDefaultTypeormRepository', {
  useFactory: () => dataSource.getRepository(User),
})
