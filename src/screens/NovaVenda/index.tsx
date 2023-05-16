import { View, Pressable, Text, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'

export function NovaVenda({ navigation }: any) {
  const [sales, setSales] = useState<any>([])
  const defaultValueNewSale = {
    client: '',
    paymentType: '',
    products: [],
    totalValue: 0,
  }
  const [newSale, setNewSale] = useState<any>(defaultValueNewSale)
  const [products, setProducts] = useState<any>([])

  function createNewSale() {
    setSales((oldSales: any) => [
      ...oldSales,
      {
        id: sales.length + 1,
        ...newSale,
      },
    ])

    setNewSale(defaultValueNewSale)
  }

  function getProducts() {
    fetch('http://localhost:5000/produtos')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setProducts(data.items)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  return (
    <View style={styles.container}>
      <HeaderNewSale navigation={navigation} />
      <TextInput
        onChangeText={(text) => {
          setNewSale({
            ...newSale,
            cliente: text,
          })
        }}
        value={newSale.cliente}
        placeholder="Nome do cliente"
        style={styles.input}
      />

      <Picker
        style={styles.input}
        onValueChange={(itemValue: any) => {
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
        {products?.map((product: any) => {
          return (
            <>
              <Picker.Item label={product.name} value={product} />
            </>
          )
        })}
      </Picker>

      <Pressable style={styles.newSaleButton} onPress={createNewSale}>
        <Text style={styles.textNewSaleButton}>Finalizar</Text>
      </Pressable>
    </View>
  )
}
