import { View, TextInput, Button, FlatList } from 'react-native'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import { CardItem } from '../../components/CardItem'
import { EmptyItems } from '../../components/EmptyItems'

export function NovaVenda() {
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
      <Button title="Cadastrar" onPress={createNewSale} />

      <FlatList
        data={sales}
        keyExtractor={(sale) => sale.id}
        renderItem={({ item }) => <CardItem item={item} />}
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <EmptyItems text="Nenhuma venda encontrada" />
        )}
      />
    </View>
  )
}
