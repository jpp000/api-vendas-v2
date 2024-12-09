import { randomUUID } from 'crypto'
import { User } from '../../entities/user.entity'
import { testDataSource } from '@/products/infra/typeorm/testing/data-source'
import { UsersTypeormRepository } from '../users.repository'
import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { ConflictError } from '@/common/domain/errors/conflict.error'
import { UsersDataBuilder } from '@/users/infra/testing/helpers/users-data-builder'

describe('UsersTypeormRepository integration tests', () => {
  let ormRepository: UsersTypeormRepository
  let typeormEntityManager: any

  beforeAll(async () => {
    await testDataSource.initialize()
    typeormEntityManager = testDataSource.createEntityManager()
  })

  afterAll(async () => {
    await testDataSource.destroy()
  })

  beforeEach(async () => {
    await testDataSource.manager.query('DELETE FROM users')
    ormRepository = new UsersTypeormRepository(
      typeormEntityManager.getRepository(User),
    )
  })

  describe('findById', () => {
    it('should throw an error when the user is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.findById(id)).rejects.toThrow(
        new NotFoundError(`Entity not found with ID: ${id}`),
      )
    })

    it('should find a user by id', async () => {
      const data = UsersDataBuilder({})
      const user = testDataSource.manager.create(User, data)
      await testDataSource.manager.save(user)

      const result = await ormRepository.findById(user.id)
      expect(result.id).toEqual(user.id)
      expect(result.name).toEqual(user.name)
    })
  })

  describe('create', () => {
    it('should create a new user object', () => {
      const data = UsersDataBuilder({ name: 'User 1' })
      const result = ormRepository.create(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('save', () => {
    it('should save a new user', async () => {
      const data = UsersDataBuilder({ name: 'User 1' })
      const result = await ormRepository.save(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('update', () => {
    it('should throw an error when the user is not found', async () => {
      const data = UsersDataBuilder({})
      await expect(ormRepository.update(data)).rejects.toThrow(
        new NotFoundError(`Entity not found with ID: ${data.id}`),
      )
    })

    it('should update a user', async () => {
      const data = UsersDataBuilder({})
      const user = testDataSource.manager.create(User, data)
      await testDataSource.manager.save(user)
      user.name = 'Updated Name'

      const result = await ormRepository.update(user)
      expect(result.name).toEqual('Updated Name')
    })
  })

  describe('delete', () => {
    it('should throw an error when the user is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.delete(id)).rejects.toThrow(
        new NotFoundError(`Entity not found with ID: ${id}`),
      )
    })

    it('should delete a user', async () => {
      const data = UsersDataBuilder({})
      const user = testDataSource.manager.create(User, data)
      await testDataSource.manager.save(user)

      await ormRepository.delete(data.id)

      const result = await testDataSource.manager.findOneBy(User, {
        id: data.id,
      })
      expect(result).toBeNull()
    })
  })

  describe('findByEmail', () => {
    it('should throw an error when the user is not found', async () => {
      const email = 'user@example.com'
      await expect(ormRepository.findByEmail(email)).rejects.toThrow(
        new NotFoundError(`User not found with email: ${email}`),
      )
    })

    it('should find a user by email', async () => {
      const data = UsersDataBuilder({ email: 'user@example.com' })
      const user = testDataSource.manager.create(User, data)
      await testDataSource.manager.save(user)

      const result = await ormRepository.findByEmail(data.email)
      expect(result.email).toEqual('user@example.com')
    })
  })

  describe('conflictingEmail', () => {
    it('should throw an error when the email is already in use', async () => {
      const data = UsersDataBuilder({ email: 'user@example.com' })
      const user = testDataSource.manager.create(User, data)
      await testDataSource.manager.save(user)

      await expect(
        ormRepository.conflictingEmail('user@example.com'),
      ).rejects.toThrow(
        new ConflictError(
          `User already registered using email: user@example.com`,
        ),
      )
    })
  })
})
