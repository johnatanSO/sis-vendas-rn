import express, { Request, Response } from 'express'
import { ProductsRepository } from './../repositories/Products/ProductsRepository'

const produtosRoutes = express.Router()
const productsRepository = new ProductsRepository()

produtosRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const products = await productsRepository.list()
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

produtosRoutes.post('/', async (req: Request, res: Response) => {
  const { name, value, stock } = req.body

  try {
    const newProduct = productsRepository.create({
      name,
      value,
      stock,
    })
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

produtosRoutes.put('/', async (req: Request, res: Response) => {
  const { name, _id, value, stock } = req.body

  try {
    await productsRepository.update({
      name,
      _id,
      value,
      stock,
    })
    res.status(202).json({ message: 'Produto atualizado com sucesso' })
  } catch (error) {
    res.status(400).json({ error })
  }
})

produtosRoutes.delete('/', async (req: Request, res: Response) => {
  const { idProduct } = req.body

  try {
    await productsRepository.delete(idProduct)
    res.status(202).json({ message: 'Produto excluído com sucesso' })
  } catch (error) {
    res.status(400).json({ error })
  }
})

export { produtosRoutes }
