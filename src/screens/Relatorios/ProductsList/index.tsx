import { View, FlatList, Pressable, Text } from 'react-native'
import { EmptyItems } from '../../../components/EmptyItems'
import { formatting } from '../../../utils/formatting'
import { styles } from './ProductsList.styles'
import { useEffect, useState } from 'react'
import http from '../../../http'

export interface Product {
  _id: string
  name: string
  value: number
  stock: number
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    http
      .get('/produtos/')
      .then((res) => {
        setProducts(res.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <FlatList
      data={products}
      ListEmptyComponent={() => <EmptyItems text="Nenhum produto encontrado" />}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
      keyExtractor={(product) => product?._id}
      renderItem={({ item }) => {
        return (
          <Pressable style={styles.productItem}>
            <Text style={styles.text}>
              {item?.name} - {item?.stock}x
            </Text>
            <Text style={styles.text}>
              {formatting.formatarReal(item?.value || 0)}
            </Text>
          </Pressable>
        )
      }}
    />
  )
}
