const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  client: {
    type: String,
    default: null,
  },
  products: [
    {
      name: { type: String, default: null },
      value: { type: Number, default: null },
      amount: { type: Number, default: null },
    },
  ],
  paymentType: { type: String, default: null },
  totalValue: { type: Number, default: null },
  date: {
    type: Date || String,
    default: Date.now,
  },
})

const Sale = mongoose.model('Sale', saleSchema)

module.exports = Sale
