import React from 'react'

import { Backdrop, Card, CardContent, CardHeader, CircularProgress, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import CheckDecagram from 'mdi-material-ui/CheckDecagram'
import Refresh from 'mdi-material-ui/Refresh'
import { useDispatch } from 'react-redux'
import { getNumbers } from 'src/redux/Statistics/action'

const VerifLeft = ({ title, stats }) => {
  const dispatch = useDispatch()

  const handleBackDrop = () => {
    dispatch(getNumbers())
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader title={title} />
      <CardContent>
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <CustomAvatar
            skin='light'
            sx={{ mb: 3 }}
            color={stats?.verifLeft > 5 ? 'success' : stats?.verifLeft > 3 ? 'warning' : 'error'}
            variant='rounded'
          >
            <CheckDecagram />
          </CustomAvatar>
          <Typography sx={{ mb: 0.5 }} variant='body2'>
            Verifications left
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>{stats?.verifLeft}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%', mt: -2 }}>
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => handleBackDrop()}
            >
              <Refresh fontSize='small' />
            </IconButton>
          </Box>
        </Grid>
      </CardContent>
      <Backdrop
        open={stats.load}
        sx={{
          position: 'absolute',
          color: theme => theme.palette.common.white,
          zIndex: theme => theme.zIndex.mobileStepper - 1
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Card>
  )
}

export default VerifLeft
