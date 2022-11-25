import express from 'express';
import { z } from 'zod';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { prisma } from './lib/prisma';


const port = process.env.PORT || 3333

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

app.get('/me', async (req, res) => {
  const token = req.rawHeaders[5].replace('Bearer ', '')
  const user = jwt.verify(token, 'secret')

  if (!user) return
  
  return res.json({ user })
})

app.post('/users', async (req, res) => {
  const createUserBody = z.object({
    username: z.string(),
    password: z.string()
  })

  const { username, password } = createUserBody.parse(req.body)

  let user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        username,
        password
      }
    })
  }

  const token = jwt.sign({
    username
  }, 'secret', { expiresIn: '7d' })

  return res.status(201).send({ token }) 
})

app.listen(port, () => console.log(`listening on port ${port}`))