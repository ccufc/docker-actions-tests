const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

beforeEach(async () => {
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john.doe@example.com')
  })

  it('should fail when creating a user with the same email', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      },
    })

    await expect(
      prisma.user.create({
        data: {
          name: 'Jane Doe',
          email: 'john.doe@example.com',
          password: 'password123',
        },
      })
    ).rejects.toThrowError()
  })
})
