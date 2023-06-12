import { useContext, useEffect } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { Modal, View, Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { styles } from './AlertNotify.styles'
import theme from '../../../styles/theme'

export function AlertNotify() {
  const { alertNotifyConfigs } = useContext(AlertContext)
  useEffect(() => {
    if (alertNotifyConfigs.open) {
      // alertNotifyConfigs.handleClose()
    }
  }, [alertNotifyConfigs.open])
  if (!alertNotifyConfigs.open) return <></>
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
            size={30}
            color={
              alertNotifyConfigs?.type === 'success'
                ? theme.COLORS.GREEN_500
                : theme.COLORS.RED
            }
            style={styles.icon}
          />
          <Text style={styles.text}>{alertNotifyConfigs?.text || '--'}</Text>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
