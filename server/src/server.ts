import Fastify from 'fastify';


async function bootstrap() {
  const fastify = Fastify()

  fastify.get('/passwords', () => {
    return { password: 'Sem senhas no momento' }
  })

  await fastify.listen({ port: 3333 })
}

bootstrap()