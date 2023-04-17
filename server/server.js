const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')

app.use(cors())
app.use('/vendas', require('./routes/vendas'))
app.use('/formasDePagamento', require('./routes/formasDePagamento'))

app.listen(PORT, () => console.log('SERVIDOR RODANDO NA PORTA 8080!'))

app.get('/', function (req, res) {
  try {
    res.status(200).send('<h1>Servidor funcionando corretamente</h1>')
  } catch (err) {
    res.status(500).send('<h1>Falha ao iniciar o servidor</h1>')
  }
})
