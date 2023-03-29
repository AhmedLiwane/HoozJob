import React from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { Avatar } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icons Imports
import Cellphone from 'mdi-material-ui/Cellphone'
import Laptop from 'mdi-material-ui/Laptop'

// ** Icons Imports
import Monitor from 'mdi-material-ui/Monitor'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import TabletAndroid from 'mdi-material-ui/TabletAndroid'
const DeviceType = ({ title, subtitle1, subtitle2, subheader, stats }) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Box sx={{ mb: 10, mt: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 1.5, borderRadius: '6px' }}>
                <TabletAndroid />
              </CustomAvatar>
              <Typography variant='body2'>Mobile</Typography>
            </Box>
            <Typography variant='h6'>{stats.map(t => t.phone)}</Typography>
          </Box>
          <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
            <CustomAvatar skin='light' color='secondary' sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>
              VS
            </CustomAvatar>
          </Divider>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1.5 }} variant='body2'>
                Desktop
              </Typography>
              <CustomAvatar skin='light' variant='rounded' sx={{ borderRadius: '6px' }}>
                <Monitor />
              </CustomAvatar>
            </Box>
            <Typography variant='h6'>{stats.map(t => t.computer)}</Typography>
          </Box>
        </Box>
        <LinearProgress
          value={stats.map(t => t.computer)}
          variant='determinate'
          sx={{
            height: 10,
            '&.MuiLinearProgress-colorPrimary': { backgroundColor: 'primary.main' },
            '& .MuiLinearProgress-bar': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: 'warning.main'
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

export default DeviceType

const IconBox = ({ icon, subtitle, number }) => {
  return (
    <Grid
      item
      xs={6}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <Avatar sx={{ mb: 3 }} color='success' variant='rounded'>
        {icon}
      </Avatar>
      <Typography sx={{ mb: 2 }} variant='body2'>
        {subtitle}
      </Typography>
      <Typography sx={{ fontWeight: 600 }}>{number}</Typography>
    </Grid>
  )
}
