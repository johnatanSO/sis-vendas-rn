import http from '../http'
import { NewSale } from '../screens/NovaVenda'

export const salesService = {
  getAll() {
    return http.get('/vendas')
  },
  create(saleData: NewSale) {
    const body = { ...saleData }
    return http.post('/vendas', { ...body })
  },
}
