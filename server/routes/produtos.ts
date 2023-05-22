import express, { Request, Response } from 'express'
import ProductModel from '../models/product'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
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

router.post('/', async (req: Request, res: Response) => {
  const { name, value, stock } = req.body

  try {
    const newProduct = new ProductModel({
      name,
      value,
      stock,
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

router.delete('/', async (req: Request, res: Response) => {
  const { idProduct } = req.body

  try {
    await ProductModel.deleteOne({ _id: idProduct })
    res.status(202).json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put('/', async (req: Request, res: Response) => {
  const { name, _id, value, stock } = req.body

  try {
    await ProductModel.updateOne({ _id }, { $set: { name, value, stock } })
    res.status(202).json({ message: 'Produto atualizado com sucesso' })
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
