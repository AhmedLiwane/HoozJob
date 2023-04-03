import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import MagnifyPlusOutline from 'mdi-material-ui/MagnifyPlusOutline'
import { Tooltip } from '@mui/material'

const DocumentsTab = ({ data }) => {
  // ** States
  const [frontID, setFront] = useState('/images/cards/idcard.jpg')
  const [backID, setBack] = useState('/images/cards/idcard.jpg')
  const [reloadFront, setReloadFront] = useState(false)
  const [reloadBack, setReloadBack] = useState(false)
  const [openFront, setOpenFront] = useState(false)
  const [openBack, setOpenBack] = useState(false)

  const decryptFront = () => {
    const headers = { 'x-company-token': localStorage.getItem('accessToken') }
    setReloadFront(true)
    axios
      .get(`https://api.hoozjob.com/api/backoffice/decryptFrontImage/${data.id}`, { headers })
      .then(res => {
        setFront('data:image/jpeg;base64,' + res.data?.data)
        setReloadFront(false)
      })
      .catch(err => {
        setReloadFront(false)
      })
  }

  const decryptBack = () => {
    const headers = { 'x-company-token': localStorage.getItem('accessToken') }
    setReloadBack(true)
    axios
      .get(`https://api.hoozjob.com/api/backoffice/decryptBackImage/${data.id}`, { headers })
      .then(res => {
        setBack('data:image/jpeg;base64,' + res.data?.data)
        setReloadBack(false)
      })
      .catch(err => {
        setReloadBack(false)
      })
  }

  const handleOpenFront = () => {
    setOpenFront(true)
    decryptFront()
  }

  const handleOpenBack = () => {
    setOpenBack(true)
    decryptBack()
  }

  const handleCloseFront = () => {
    setOpenFront(false)
    setFront('/images/cards/idcard.jpg')
  }

  const handleCloseBack = () => {
    setOpenBack(false)
    setBack('/images/cards/idcard.jpg')
  }

  const hideBack = () => {
    setBack('/images/cards/idcard.jpg')
  }

  const hideFront = () => {
    setFront('/images/cards/idcard.jpg')
  }

  return (
    <Card title='ID Card'>
      <CardHeader title={`Applcant's Documents`} />

      {data?.DocFront ? (
        <Box sx={{ display: 'flex', gap: 12, pb: 4 }}>
          <Box>
            <CardHeader subheader='Front Side' />
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                  <IconButton onClick={decryptFront}>
                    <Tooltip title='Uncover'>
                      <EyeOutline />
                    </Tooltip>
                  </IconButton>
                  <IconButton onClick={hideFront}>
                    <Tooltip title='Cover'>
                      <EyeOffOutline />
                    </Tooltip>
                  </IconButton>
                  <IconButton>
                    <Tooltip title='Zoom'>
                      <MagnifyPlusOutline
                        onClick={() => {
                          handleOpenFront()
                        }}
                      />
                    </Tooltip>
                  </IconButton>
                </CardContent>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Backdrop
                  open={reloadFront}
                  sx={{
                    color: theme => theme.palette.common.white,
                    zIndex: theme => theme.zIndex.mobileStepper - 1,
                    position: 'absolute'
                  }}
                >
                  <CircularProgress color='inherit' />
                </Backdrop>
                <CardMedia
                  component='img'
                  sx={{ width: 400, cursor: 'pointer' }}
                  image={frontID}
                  alt='Live from space album cover'
                  onClick={handleOpenFront}
                />
              </Box>
            </Box>
          </Box>
          <Dialog
            open={openFront}
            onClose={handleCloseFront}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth='md'
          >
            <CardMedia
              component='img'
              sx={{ width: '100%', position: 'relative' }}
              image={frontID}
              alt='Live from space album cover'
            />
            <Backdrop
              open={reloadFront}
              sx={{
                color: theme => theme.palette.common.white,
                zIndex: theme => theme.zIndex.mobileStepper - 1,
                position: 'absolute'
              }}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          </Dialog>
          <Dialog
            open={openBack}
            onClose={handleCloseBack}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth='md'
          >
            <CardMedia
              component='img'
              sx={{ width: '100%', position: 'relative' }}
              image={backID}
              alt='Live from space album cover'
            />
            <Backdrop
              open={reloadBack}
              sx={{
                color: theme => theme.palette.common.white,
                zIndex: theme => theme.zIndex.mobileStepper - 1,
                position: 'absolute'
              }}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          </Dialog>
          {/* BACK SIDE */}
          {data?.DocType === 'ID_CARD' ? (
            <Box>
              <CardHeader subheader='Back Side' title='' />
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                    <IconButton onClick={decryptBack}>
                      <Tooltip title='Uncover'>
                        <EyeOutline />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={hideBack}>
                      <Tooltip title='Cover'>
                        <EyeOffOutline />
                      </Tooltip>
                    </IconButton>
                    <IconButton>
                      <Tooltip title='Zoom'>
                        <MagnifyPlusOutline onClick={handleOpenBack} />
                      </Tooltip>
                    </IconButton>
                  </CardContent>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <Backdrop
                    open={reloadBack}
                    sx={{
                      color: theme => theme.palette.common.white,
                      zIndex: theme => theme.zIndex.mobileStepper - 1,
                      position: 'absolute'
                    }}
                  >
                    <CircularProgress color='inherit' />
                  </Backdrop>
                  <CardMedia
                    component='img'
                    sx={{ width: 400, cursor: 'pointer' }}
                    image={backID}
                    alt='Live from space album cover'
                    onClick={handleOpenBack}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
      ) : (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>No documents yet.</CardContent>
      )}
    </Card>
  )
}

export default DocumentsTab
