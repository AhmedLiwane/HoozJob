import { useState } from 'react'

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

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const DocumentsTab = ({ data }) => {
  // ** States
  const [frontID, setFront] = useState('/images/cards/idcard.jpg')
  const [backID, setBack] = useState('/images/cards/idcard.jpg')
  const [reload, setReload] = useState(false)

  const decryptFront = () => {
    const headers = { 'x-company-token': localStorage.getItem('accessToken') }
    setReload(true)
    axios
      .get(`http://localhost:5000/api/backoffice/decryptFrontImage/${data.id}`, { headers })
      .then(res => {
        setFront('data:image/jpeg;base64,' + res.data?.data)
        setReload(false)
      })
      .catch(err => {
        setReload(false)
      })
  }

  const decryptBack = () => {
    const headers = { 'x-company-token': localStorage.getItem('accessToken') }
    setReload(true)
    axios
      .get(`http://localhost:5000/api/backoffice/decryptBackImage/${data.id}`, { headers })
      .then(res => {
        setBack('data:image/jpeg;base64,' + res.data?.data)
        setReload(false)
      })
      .catch(err => {
        setReload(false)
      })
  }

  return (
    <Card
      title='ID Card'
      sx={{
        p: 6,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', gap: 20 },
        justifyContent: 'space-around'
      }}
    >
      <Box>
        <CardHeader subheader='Front Side' />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
              <IconButton>
                <EyeOutline />
              </IconButton>
              <IconButton>
                <EyeOffOutline />
              </IconButton>
            </CardContent>
          </Box>
          <Backdrop
            open={reload}
            sx={{
              color: theme => theme.palette.common.white,
              zIndex: theme => theme.zIndex.mobileStepper - 1
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <CardMedia component='img' sx={{ width: 400 }} image={frontID} alt='Live from space album cover' />
        </Box>
      </Box>{' '}
      {'ID_CARD' === 'ID_CARD' ? (
        <Box>
          <CardHeader subheader='Back Side' title='' />
          <Box sx={{ width: '100%', display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                <IconButton>
                  <EyeOutline />
                </IconButton>
                <IconButton>
                  <EyeOffOutline />
                </IconButton>
              </CardContent>
            </Box>
            <Backdrop
              open={reload}
              sx={{
                color: theme => theme.palette.common.white,
                zIndex: theme => theme.zIndex.mobileStepper - 1
              }}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
            <CardMedia component='img' sx={{ width: 400 }} image={backID} alt='Live from space album cover' />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Card>
  )
}

export default DocumentsTab
