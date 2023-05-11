export const formatting = {
  formatarReal(value: number | string) {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  },
  formatarFormaDePagamento(paymentType: string){
    const formasDePagamento:any[] = [
      {text: 'Cartão de crédito', value: 'credit_card'},
      {text: 'Cartão de débito', value: 'debit_card'},
    ]

    const paymentTypeFormated = formasDePagamento.find(payment => payment.value === paymentType)
    
    return paymentTypeFormated ? paymentTypeFormated.text : '--'
  }
}
