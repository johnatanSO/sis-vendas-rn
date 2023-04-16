import { View, Text } from 'react-native'
import { styles } from './EmptyItemsStyles'

interface EmptyItemsProps {
  text: string
}

export function EmptyItems({ text }: EmptyItemsProps) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  )
}
