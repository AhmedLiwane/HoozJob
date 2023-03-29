// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** View Party Imports
import DialogTestVerification from '../Dialog/DialogTestVerification'

// ** Icons Imports
import Refresh from 'mdi-material-ui/Refresh'
import AccountAlert from 'mdi-material-ui/AccountAlert'
import AccountClock from 'mdi-material-ui/AccountClock'
import AccountCancel from 'mdi-material-ui/AccountCancel'
import AccountCheck from 'mdi-material-ui/AccountCheck'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import { useDispatch } from 'react-redux'
import { getNumbers, getStat } from 'src/redux/Statistics/action'

import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const TopCards = ({ stat }) => {
  // ** States
  const dispatch = useDispatch()

  const cardData = [
    { totalUsers: stat?.pro, title: 'Pro', avatars: <AccountCheck sx={{ color: 'rgb(137,230,76)' }} /> },
    { totalUsers: stat?.pending, title: 'Pending', avatars: <AccountAlert sx={{ color: '#FDD835' }} /> },
    { totalUsers: stat?.normal, title: 'Normal', avatars: <AccountClock sx={{ color: '#737E92' }} /> }
  ]

  const renderCards = () =>
    cardData.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card sx={{ position: 'relative' }}>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography key={index} variant='body2'>
                Total : <strong>{item.totalUsers}</strong> Sessions
              </Typography>
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatarGroup-avatar': { fontSize: '.875rem' },
                  '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 40, height: 40 }
                }}
              >
                {item.avatars}
              </AvatarGroup>
            </Box>
            <Box>
              <Typography key={index} variant='h6' sx={{ color: 'text.secondary' }}>
                {item.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      {/* <Grid item xs={12} sm={6} lg={4}>
        <Card>
          <Grid container sx={{ height: '100%', display: 'inline-flex' }}>
            <Grid>
              <CardContent>
                <DialogTestVerification />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default TopCards
