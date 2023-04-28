const express = require('express')
const router = express.Router()
const ProductModel = require('../models/product')

router.get('/', async (req, res) => {
  try {
    const produtos = await ProductModel.find()

    res.status(200).json({
      items: produtos,
      message: 'Busca concluída com sucesso!',
    })
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Falha ao buscar dados', items: [] })
  }
})

router.post('/', async (req, res) => {
  try {
    const newProduct = new ProductModel({
      name: req.body.name,
      value: req.body.value,
      stock: req.body.stock,
    })
    await newProduct.save()

    res.status(200).json({
      item: newProduct,
      message: 'Produto cadastrado com sucesso!',
    })
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Falha ao cadastrar produto!',
      item: undefined,
    })
  }
})

module.exports = router
