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
      title: 'Social Media',
      userId: user.id,
    }
  })

  const category2 = await prisma.category.create({
    data: {
      title: 'Main',
      userId: user.id,
    }
  }) 

  await prisma.password.create({
    data: {
      title: 'Teste',
      icon: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
      email: 'marlon@gmail.com',
      value: 'senha123',
      webside: 'https://developer.mozilla.org/pt-BR/',
      notes: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius voluptate suscipit laudantium repellendus? Aut doloremque repellat autem expedita dolorem odio fugit repudiandae, impedit velit eaque praesentium non numquam officia? Debitis.',
      userId: user.id,
      categoryId: category1.id
    }
  })

  await prisma.password.create({
    data: {
      title: 'Teste 2',
      icon: 'https://developer.mozilla.org/favicon-48x48.cbbd161b.png',
      email: 'marlon@gmail.com',
      value: 'senha12345',
      webside: 'https://developer.mozilla.org/pt-BR/',
      userId: user.id,
      categoryId: category2.id
    }
  })
}

main()