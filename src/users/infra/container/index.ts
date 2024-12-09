import { container } from 'tsyringe'
import { Repository } from 'typeorm'
import { User } from '../typeorm/entities/user.entity'
import { dataSource } from '@/common/infra/typeorm'

container.register<Repository<User>>('UsersDefaultTypeormRepository', {
  useFactory: () => dataSource.getRepository(User),
})
