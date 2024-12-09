import { NotFoundError } from '@/common/domain/errors/not-found.error'
import { ConflictError } from '@/common/domain/errors/conflict.error'
import { UserModel } from '@/users/domain/models/user.model'
import { UsersInMemoryRepository } from '../users-in-memory.repository'

describe('UsersInMemoryRepository', () => {
  let repository: UsersInMemoryRepository
  let mockUser: UserModel

  beforeEach(() => {
    repository = new UsersInMemoryRepository()
    mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123',
      created_at: new Date(),
      updated_at: new Date(),
    }
    repository.items = [mockUser]
  })

  describe('findByName', () => {
    it('should find a user by name', async () => {
      const user = await repository.findByName('John Doe')
      expect(user).toEqual(mockUser)
    })

    it('should throw NotFoundError if user is not found by name', async () => {
      await expect(repository.findByName('Jane Doe')).rejects.toThrowError(
        new NotFoundError('User not found using name: Jane Doe'),
      )
    })
  })

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const user = await repository.findByEmail('john.doe@example.com')
      expect(user).toEqual(mockUser)
    })

    it('should throw NotFoundError if user is not found by email', async () => {
      await expect(
        repository.findByEmail('jane.doe@example.com'),
      ).rejects.toThrowError(
        new NotFoundError('User not found with email: jane.doe@example.com'),
      )
    })
  })

  describe('conflictingEmail', () => {
    it('should throw ConflictError if email already exists', async () => {
      await expect(
        repository.conflictingEmail('john.doe@example.com'),
      ).rejects.toThrowError(
        new ConflictError(
          'User already registered using email: john.doe@example.com',
        ),
      )
    })

    it('should not throw ConflictError if email does not exist', async () => {
      await expect(
        repository.conflictingEmail('new.email@example.com'),
      ).resolves.not.toThrowError()
    })
  })

  describe('applyFilter', () => {
    it('should filter users by name', async () => {
      const filteredUsers = await repository['applyFilter'](
        repository.items,
        'john',
      )
      expect(filteredUsers).toEqual([mockUser])
    })

    it('should return all users if no filter is applied', async () => {
      const filteredUsers = await repository['applyFilter'](
        repository.items,
        null,
      )
      expect(filteredUsers).toEqual([mockUser])
    })
  })

  describe('applySort', () => {
    it('should sort users by specified field and direction', async () => {
      const user2: UserModel = {
        id: '2',
        name: 'Alice',
        email: 'alice@example.com',
        password: '123',
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-01'),
      }
      repository.items.push(user2)

      const sortedUsersAsc = await repository['applySort'](
        repository.items,
        'name',
        'asc',
      )
      expect(sortedUsersAsc).toEqual([user2, mockUser])

      const sortedUsersDesc = await repository['applySort'](
        repository.items,
        'name',
        'desc',
      )
      expect(sortedUsersDesc).toEqual([mockUser, user2])
    })
  })
})
