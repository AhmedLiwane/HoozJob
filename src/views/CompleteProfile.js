// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const CompleteProfile = ({ isOpen, callBack }) => {
  const router = useRouter()

  // ** State
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    router.push('/account-settings/')
    callBack(false)
  }

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Fragment>
      <Dialog open={open} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>You need to complete your profile</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            To fully use the dashboard, you need to complete your company and profile informations first.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Complete</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default CompleteProfile
