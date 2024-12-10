import 'reflect-metadata'
import { UsersInMemoryRepository } from '@/users/domain/in-memory/repositories/users-in-memory.repository'
import { CreateUserUseCase } from '../create-user.usecase'
import { UserOutput } from '../../dtos/user-output.dto'
import { ConflictError } from '@/common/domain/errors/conflict.error'
import { BcryptHashProvider } from '@/users/infra/providers/hash/bcrypt-hash.provider'

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase.UseCase
  let usersRepository: UsersInMemoryRepository
  let hashProvider: BcryptHashProvider

  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    hashProvider = new BcryptHashProvider()
    createUserUseCase = new CreateUserUseCase.UseCase(
      usersRepository,
      hashProvider,
    )
  })

  it('should create a new user successfully', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    const userOutput: UserOutput = await createUserUseCase.execute(input)

    // Verifica se o usuário foi criado com senha criptografada
    const isPasswordValid = await hashProvider.compare(
      input.password,
      userOutput.password,
    )
    expect(isPasswordValid).toBeTruthy()
    expect(userOutput).toHaveProperty('id')
    expect(userOutput.name).toBe(input.name)
    expect(userOutput.email).toBe(input.email)
  })

  it('should throw ConflictError when email is already in use', async () => {
    const input1 = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    const input2 = {
      name: 'Jane Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    await createUserUseCase.execute(input1)

    // Verifica se ocorre erro de conflito quando tentamos criar um segundo usuário com o mesmo email
    await expect(createUserUseCase.execute(input2)).rejects.toThrowError(
      new ConflictError(
        'User already registered using email: john.doe@example.com',
      ),
    )
  })

  it('should throw ConflictError when email is already in use (email check before save)', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    await createUserUseCase.execute(input)

    const secondInput = {
      name: 'Jane Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }

    // Tenta criar um usuário com o mesmo email e espera o erro
    await expect(createUserUseCase.execute(secondInput)).rejects.toThrowError(
      new ConflictError(
        'User already registered using email: john.doe@example.com',
      ),
    )
  })
})
