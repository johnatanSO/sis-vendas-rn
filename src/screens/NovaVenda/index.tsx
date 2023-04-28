import { View, Pressable, Text, TextInput } from 'react-native'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'

export function NovaVenda({navigation}:any) {
  const [sales, setSales] = useState<any>([])
  const defaultValueNewSale = {
    cliente: {
      nome: '',
    },
  }
  const [newSale, setNewSale] = useState<any>(defaultValueNewSale)

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

  return (
    <View style={styles.container}>
      <HeaderNewSale navigation={navigation} />
      <TextInput
        onChangeText={(text) => {
          setNewSale({
            ...newSale,
            cliente: {
              ...newSale.cliente,
              nome: text,
            },
          })
        }}
        value={newSale.cliente.nome}
        placeholder="Nome do cliente"
        style={styles.input}
      />
      <TextInput
        placeholder="Valor da venda"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput placeholder="Produtos" style={styles.input} />

      <Pressable style={styles.newSaleButton} onPress={createNewSale}>
        <Text style={styles.textNewSaleButton}>Finalizar</Text>
      </Pressable>
    </View>
  )
}
