import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import cors from 'cors';


const prisma = new PrismaClient()

const port = process.env.PORT|| 3333

const app = express()
app.use(express.json())
app.use(cors())

app.get('/passwords', async (req, res) => {
  const passwords = await prisma.password.findMany()

  return res.json({
    password: passwords
  })
})

app.post('/passwords', async (req, res) => {
  const createPasswordBody = z.object({
    title: z.string(),
    value: z.string()
  })

  const { title, value } = createPasswordBody.parse(req.body)
  
  await prisma.password.create({
    data: {
      title,
      value,
      userId: 'claq1ihvj0000t5qednvcoge9',
      categoryId: 'claq1iilp0002t5qep391km6p'
    }
  })

  return res.status(201).send({ title })
})

app.listen(port, () => console.log(`listening on port ${port}`))