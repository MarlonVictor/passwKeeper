import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Marlon Victor',
      email: 'cmarlonvictor11@gmail.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/62356988?v=4'
    }
  })

  const category1 = await prisma.category.create({
    data: {
      title: 'Social Media'
    }
  })

  const category2 = await prisma.category.create({
    data: {
      title: 'Main'
    }
  }) 

  await prisma.password.create({
    data: {
      title: 'Teste',
      value: 'senha123',
      userId: user.id,
      categoryId: category1.id
    }
  })

  await prisma.password.create({
    data: {
      title: 'Teste 2',
      value: 'senha12345',
      userId: user.id,
      categoryId: category2.id
    }
  })
}

main()