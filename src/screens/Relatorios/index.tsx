import { View, Pressable, Text, FlatList } from 'react-native'
import { styles } from './RelatoriosStyles'
import HeaderReports from '../../layout/HeaderReports'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { EmptyItems } from '../../components/EmptyItems'
import theme from '../../../styles/theme'
import { formatting } from '../../utils/formatting'

export function Relatorios() {
  return (
    <View style={styles.container}>
      <HeaderReports />
      <View style={styles.subHeader}>
        <Pressable style={styles.menuButton}>
          <FontAwesomeIcon style={{...styles.buttonIcon, color: theme.COLORS.PRIMARY_COLOR, borderColor: theme.COLORS.PRIMARY_COLOR}} icon={faWineBottle} />
          <Text style={{...styles.buttonText, color: theme.COLORS.PRIMARY_COLOR}}>Products</Text>
        </Pressable>
        <Pressable style={styles.menuButton}>
          <FontAwesomeIcon style={styles.buttonIcon} icon={faUsers} />
          <Text style={styles.buttonText}>Clients</Text>
        </Pressable>
      </View>

      {/* PRODUCT LIST */}
      {/* TO-DO:  
        - Separar em componente;
      */}


      <FlatList
        data={
          [
            {nome: 'Product test', value: 15}
          ]
        }
        ListEmptyComponent={() => (
          <EmptyItems text="Nenhuma venda encontrada" />
        )}
        style={{
          marginTop: 15,
          width: '85%',
        }}
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
                padding: "1rem",
                paddingRight: 20,
                paddingLeft: 20
              }}
            >
              <Text 
                style={{
                  color: 'white',
                  fontSize: 18,
                }}
              >
                {item?.nome}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}
              >
                {formatting.formatarReal(item?.value || 0)}
              </Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}
