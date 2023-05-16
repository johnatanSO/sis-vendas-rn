import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, default: null },
  value: { type: Number, default: null },
  stock: { type: Number, default: null },
})

const Product = mongoose.model('Product', productSchema)

export default Product
