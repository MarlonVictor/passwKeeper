import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

const port = process.env.PORT|| 3333

const app = express()
app.use(express.json())

app.get('/passwords', async (req, res) => {
  const passwords = await prisma.password.findMany()

  return res.json({
    password: passwords
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))