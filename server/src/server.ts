import express from 'express';


const port = process.env.PORT|| 3333

const app = express()
app.use(express.json())

app.get('/passwords', (req, res) => {
  return res.json({
    password: 'Sem senhas no momento'
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))