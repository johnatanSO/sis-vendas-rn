import { ReactNode, createContext, useState } from 'react'
import { AlertDialogConfirm } from '../components/AlertDialogConfirm'
import { AlertNotify } from '../components/AlertNotify'

interface AlertContextComponentProps {
  children: ReactNode
}

interface AlertDialogConfirmConfigs {}

interface AlertNotifyConfigs {
  open: boolean
  type: 'success' | 'error'
  text: string
  handleClose: () => void
}

export const AlertContext = createContext({} as any)

export function AlertContextComponent({
  children,
}: AlertContextComponentProps) {
  const [alertDialogConfirmConfigs, setAlertDialogConfirmConfigs] =
    useState<AlertDialogConfirmConfigs>({})

  const [alertNotifyConfigs, setAlertNotifyConfigs] =
    useState<AlertNotifyConfigs>({
      open: false,
      text: '',
      type: 'success',
      handleClose: onCloseNotify,
    })

  function onCloseNotify() {
    setTimeout(() => {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: false,
        text: '',
        type: 'success',
      })
    }, 7000)
  }

  return (
    <AlertContext.Provider
      value={{
        alertDialogConfirmConfigs,
        setAlertDialogConfirmConfigs,
        alertNotifyConfigs,
        setAlertNotifyConfigs,
      }}
    >
      {children}
      <AlertDialogConfirm />
      <AlertNotify />
    </AlertContext.Provider>
  )
}
