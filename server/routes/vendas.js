const express = require('express')
const router = express.Router()
const sales = require('../db/sales.data')

router.get('/', function (req, res) {
  try {
    res.status(200).json({
      items: sales,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

module.exports = router
