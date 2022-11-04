import express from 'express';
import { PrismaClient } from '@prisma/client';
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

app.listen(port, () => console.log(`listening on port ${port}`))