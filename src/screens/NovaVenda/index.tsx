import { View, Pressable, Text, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento } from '../../utils/formatting'
import { salesService } from '../../services/salesService.service'

interface NovaVendaProps {
  navigation: any
}
export interface NewSale {
  client: string
  products: Product[]
  paymentType: string
  totalValue: number
}

export function NovaVenda({ navigation }: NovaVendaProps) {
  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
    totalValue: 0,
  }
  const [newSale, setNewSale] = useState<NewSale>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<Product[]>([])

  function createNewSale() {
    salesService
      .create(newSale)
      .then((res) => {
        // navigation.navigate('Vendas')
        console.log(res)
      })
      .catch((err) => {
        console.log('[ERROR]: ', err)
      })
  }

  function getProducts() {
    http
      .get('/produtos')
      .then((res) => {
        setProductsList(res.data.items)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  return (
    <View style={styles.container}>
      <HeaderNewSale navigation={navigation} />

      <View style={styles.fields}>
        <TextInput
          onChangeText={(text) => {
            setNewSale({
              ...newSale,
              client: text,
            })
          }}
          value={newSale.client}
          placeholder="Nome do cliente"
          style={styles.input}
        />

        <Picker
          style={styles.input}
          onFocus={() => {
            getProducts()
          }}
          onValueChange={(index: any) => {
            if (index) {
              setNewSale({
                ...newSale,
                products: [...newSale.products, productsList[index]],
              })
            }
          }}
        >
          {productsList?.map((product, index) => {
            return (
              <Picker.Item
                key={product._id}
                label={product?.name}
                value={index}
              />
            )
          })}
        </Picker>

        <Picker
          style={styles.input}
          onValueChange={(formaDePagamento: string) => {
            console.log(formaDePagamento)
            if (formaDePagamento) {
              setNewSale({
                ...newSale,
                paymentType: formaDePagamento,
              })
            }
          }}
        >
          {formasDePagamento?.map((formaDePagamento) => {
            return (
              <Picker.Item
                key={formaDePagamento.value}
                label={formaDePagamento?.text}
                value={formaDePagamento?.value}
              />
            )
          })}
        </Picker>
      </View>

      <Pressable style={styles.newSaleButton} onPress={createNewSale}>
        <Text style={styles.textNewSaleButton}>Finalizar</Text>
      </Pressable>
    </View>
  )
}
