import { Text, View } from 'react-native'
import { styles } from './HeaderStyles'

interface HeaderProps {
  children: string
}

export default function Header({ children }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 18 }}>
        {children || 'Sistema de vendas'}
      </Text>
    </View>
  )
}
