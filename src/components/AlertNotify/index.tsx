import { useContext } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { Modal, View, Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { styles } from './AlertNotify.styles'

export function AlertNotify() {
  const { alertNotifyConfigs } = useContext(AlertContext)
  return (
    <Modal
      visible={alertNotifyConfigs?.open}
      onRequestClose={() => {}}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      id="modalOverlay"
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <FontAwesomeIcon
            icon={alertNotifyConfigs?.type === 'success' ? faCheck : faXmark}
          />
          <Text>{alertNotifyConfigs?.text || '--'}</Text>
          <Pressable>
            <Text>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
