import { PrismaClient } from '@prisma/client'

import { hashPassword } from '../utils/encryption'

const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async (transaction) => {
    const publicGroup = await transaction.group.upsert({
      where: { name: 'All' },
      update: {},
      create: {
        name: 'All',
        isPublic: true,
      },
    })

    const scottsData = {
      password: await hashPassword('Password123!'),
      name: 'Scott',
    }
    const scott = await transaction.user.upsert({
      where: { email: 'scott@example.com' },
      update: {
        ...scottsData,
      },
      create: {
        email: 'scott@example.com',
        ...scottsData,
      },
    })

    await transaction.groupMembership.upsert({
      where: { groupId_userId: { userId: scott.id, groupId: publicGroup.id } },
      update: {},
      create: {
        userId: scott.id,
        groupId: publicGroup.id,
        role: 'ADMIN',
      },
    })
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
