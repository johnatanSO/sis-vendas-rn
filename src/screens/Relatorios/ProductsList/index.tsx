import { View, FlatList, Pressable, Text } from 'react-native'
import { EmptyItems } from '../../../components/EmptyItems'
import { formatting } from '../../../utils/formatting'
import { styles } from './ProductsList.styles'
import { useEffect } from 'react'
import http from '../../../http'

export function ProductsList() {
  useEffect(() => {
    http
      .get('/products/')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <FlatList
      data={[{ nome: 'Amstel', value: 15 }]}
      ListEmptyComponent={() => <EmptyItems text="Nenhum produto encontrado" />}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
      keyExtractor={(product) => product?.nome}
      renderItem={({ item }) => {
        return (
          <Pressable style={styles.productItem}>
            <Text style={styles.text}>{item?.nome}</Text>
            <Text style={styles.text}>
              {formatting.formatarReal(item?.value || 0)}
            </Text>
          </Pressable>
        )
      }}
    />
  )
}
