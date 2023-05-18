import { View, FlatList, Pressable, Text } from 'react-native'
import { EmptyItems } from '../../../components/EmptyItems'
import theme from '../../../../styles/theme'
import { formatting } from '../../../utils/formatting'
import { styles } from './ProductsList.styles'

// TO-DO:
// Separating by component

export function ProductsList() {
  return (
    <FlatList
      data={[{ nome: 'Amstel', value: 15 }]}
      ListEmptyComponent={() => <EmptyItems text="Nenhum produto encontrado" />}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
      keyExtractor={(product) => product?.nome}
      renderItem={({ item }) => {
        return (
          <Pressable
            style={{
              backgroundColor: theme.COLORS.GRAY_400,
              width: '100%',
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '1rem',
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
              {item?.nome}
            </Text>
            <Text
              style={{
                color: 'white',
              }}
            >
              {formatting.formatarReal(item?.value || 0)}
            </Text>
          </Pressable>
        )
      }}
    />
  )
}
