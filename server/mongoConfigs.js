const mongoose = require('mongoose')
const MONGO_USERNAME = 'johnatanSO'
const MONGO_PASSWORD = 'u72E1K8bxPcVgFhM'
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@clusterreactnative0.ct2fmit.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
  .on(
    'error',
    console.error.bind(console, 'Erro ao conectar com o banco de dados'),
  )
  .once('open', () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })

module.exports = mongoose
