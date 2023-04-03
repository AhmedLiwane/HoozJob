import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'

const UserViewSecurity = ({ data }) => {
  // ** States
  const [frontID, setFront] = useState('/images/cards/idcard.jpg')
  const [backID, setBack] = useState('/images/cards/idcard.jpg')
  const [reload, setReload] = useState(false)

  const decryptFront = () => {
    const headers = { 'x-company-token': localStorage.getItem('accessToken') }
    setReload(true)
    axios
      .get(`https://api.hoozjob.com/api/backoffice/decryptFrontImage/${data.id}`, { headers })
      .then(res => {
        setFront('data:image/jpeg;base64,' + res.data.data)
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
      .get(`https://api.hoozjob.com/api/backoffice/decryptBackImage/${data.id}`, { headers })
      .then(res => {
        setBack('data:image/jpeg;base64,' + res.data.data)
        setReload(false)
      })
      .catch(err => {
        setReload(false)
      })
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Documents' titleTypographyProps={{ variant: 'h6' }} />
        <Box>
          <Backdrop
            open={reload}
            sx={{
              color: theme => theme.palette.common.white,
              zIndex: theme => theme.zIndex.mobileStepper - 1
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
          <CardMedia sx={{ height: 450 }} image={frontID} />
        </Box>

        <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Front Side
          </Typography>
        </CardContent>
        <Button
          onClick={decryptFront}
          size='large'
          variant='contained'
          sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          Show
        </Button>

        {data.DocType === 'ID_CARD' ? (
          <>
            <CardMedia sx={{ mt: 6, height: 450 }} image={backID} />
            <CardContent sx={{ p: theme => `${theme.spacing(4, 5)} !important` }}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Back Side
              </Typography>
            </CardContent>
            <Button
              onClick={decryptBack}
              size='large'
              variant='contained'
              sx={{ width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
              Show
            </Button>
          </>
        ) : (
          ''
        )}
      </Card>
    </Fragment>
  )
}

export default UserViewSecurity
