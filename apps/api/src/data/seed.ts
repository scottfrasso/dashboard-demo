import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../utils/encryption'

const prisma = new PrismaClient()

async function main() {
  const scottsData = {
    password: await hashPassword('Password123!'),
    name: 'Scott',
  }
  await prisma.user.upsert({
    where: { email: 'scott@example.com' },
    update: {
      ...scottsData,
    },
    create: {
      email: 'scott@example.com',
      ...scottsData,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
