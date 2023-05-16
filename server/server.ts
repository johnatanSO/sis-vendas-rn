import express, { Express } from 'express'
import dbConnection from './mongoConfigs'
import bodyParser from 'body-parser'
import cors from 'cors'
import vendasRotas from './routes/vendas'
import dashboardRotas from './routes/dashboard'
import produtosRotas from './routes/produtos'

interface CustomExpress extends Express {
  mongo?: any
}

// Configs:
const app: CustomExpress = express()
const PORT = 3333
app.mongo = dbConnection
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

// Rotas do sistema:
app.use('/vendas', vendasRotas)
app.use('/dashboard', dashboardRotas)
app.use('/produtos', produtosRotas)

/* Não adicionei nenhum middleware em nenhuma das rotas (authentication || permission) 
pois o sistema é bem simples e para fins de estudo. */
app.get('/', async (req: any, res: any) => {
  try {
    res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
