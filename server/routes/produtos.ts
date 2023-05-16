import express from 'express'
import ProductModel from '../models/product'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find()

    res.status(200).json({
      items: products,
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

    res.status(201).json({
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

export default router
