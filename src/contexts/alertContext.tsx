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
    })

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
