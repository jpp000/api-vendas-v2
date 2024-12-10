import { container } from 'tsyringe'
import { Repository } from 'typeorm'
import { User } from '../typeorm/entities/user.entity'
import { dataSource } from '@/common/infra/typeorm'
import { UsersTypeormRepository } from '../typeorm/repositories/users-typeorm.repository'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { HashProvider } from '@/users/domain/providers/hash.provider'
import { BcryptHashProvider } from '../providers/hash/bcrypt-hash.provider'
import { CreateUserUseCase } from '@/users/application/usecases/create-user.usecase'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { SearchUsersUseCase } from '@/users/application/usecases/search-users.usecase'
import { TokenProvider } from '@/users/domain/providers/token.provider'
import { JwtTokenProvider } from '../providers/token/jwt-token.provider'
import { LoginUseCase } from '@/users/application/usecases/login.usecase'
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase'
import { UpdateUserPasswordUseCase } from '@/users/application/usecases/update-password.usecase'

container.registerSingleton<HashProvider>('HashProvider', BcryptHashProvider)

container.registerSingleton<TokenProvider>('TokenProvider', JwtTokenProvider)

container.registerSingleton<UsersRepository>(
  'UsersRepository',
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

container.registerSingleton<LoginUseCase.UseCase>(
  'LoginUseCase',
  LoginUseCase.UseCase,
)

container.registerSingleton<UpdateUserUseCase.UseCase>(
  'UpdateUserUseCase',
  UpdateUserUseCase.UseCase,
)

container.registerSingleton<UpdateUserPasswordUseCase.UseCase>(
  'UpdateUserPasswordUseCase',
  UpdateUserPasswordUseCase.UseCase,
)

container.register<Repository<User>>('UsersDefaultTypeormRepository', {
  useFactory: () => dataSource.getRepository(User),
})
