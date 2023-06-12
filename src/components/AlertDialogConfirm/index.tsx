import { useContext } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { Modal, View, Text, Pressable } from 'react-native'
import { styles } from './AlertDialogConfirm.styles'

export function AlertDialogConfirm() {
  const { alertDialogConfirmConfigs } = useContext(AlertContext)

  if (!alertDialogConfirmConfigs.open) return <></>

  return (
    <Modal
      visible={alertDialogConfirmConfigs?.open}
      onRequestClose={() => {}}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      id="modalOverlay"
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>
            {alertDialogConfirmConfigs?.title || '--'}
          </Text>
          <Text style={styles.text}>
            {alertDialogConfirmConfigs?.text || '--'}
          </Text>

          <View style={styles.buttonsContainer}>
            <Pressable onPress={alertDialogConfirmConfigs.handleClose}>
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable onPress={alertDialogConfirmConfigs.onClickAgree}>
              <Text>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
