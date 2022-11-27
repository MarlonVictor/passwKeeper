import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'MarlonVictor',
      password: 'senhaUsuario',
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
      icon: 'https://abs.twimg.com/favicons/twitter.2.ico',
      email: 'marlon@gmail.com',
      value: 'senha123',
      userId: user.id,
      categoryId: category1.id
    }
  })

  await prisma.password.create({
    data: {
      title: 'Teste 2',
      icon: 'https://abs.twimg.com/favicons/twitter.2.ico',
      email: 'marlon@gmail.com',
      value: 'senha12345',
      userId: user.id,
      categoryId: category2.id
    }
  })
}

main()