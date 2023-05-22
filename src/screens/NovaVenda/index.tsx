import { View, Pressable, Text, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento } from '../../utils/formatting'

interface NovaVendaProps {
  navigation: any
}

interface NewSale {
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
  const [products, setProducts] = useState<Product[]>([])

  function createNewSale() {
    setNewSale(defaultValuesNewSale)
  }

  function getProducts() {
    http
      .get('/produtos')
      .then((res) => {
        setProducts(res.data.items)
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
          onValueChange={(itemValue: Product) => {
            if (itemValue) {
              setNewSale({
                ...newSale,
                products: [...newSale.products, itemValue],
              })
            }
          }}
          onFocus={() => {
            getProducts()
          }}
        >
          {products?.map((product) => {
            return (
              <>
                <Picker.Item label={product.name} value={product} />
              </>
            )
          })}
        </Picker>

        <Picker
          style={styles.input}
          onValueChange={(formaDePagamento: string) => {
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
              <>
                <Picker.Item
                  label={formaDePagamento?.text}
                  value={formaDePagamento?.value}
                />
              </>
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
