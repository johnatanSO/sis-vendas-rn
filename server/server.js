const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3333
const cors = require('cors')
const dbConnection = require('./mongoConfigs')

app.mongo = dbConnection
app.listen(PORT, () => console.log(`SERVIDOR RODANDO NA PORTA ${PORT}!`))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/vendas', require('./routes/vendas'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/produtos', require('./routes/produtos'))

app.get('/', function (req, res) {
  try {
    res
      .status(200)
      .send(`<h1>Servidor funcionando corretamente na porta ${PORT}</h1>`)
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>', err)
  }
})
