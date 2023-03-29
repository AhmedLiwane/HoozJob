import { React, useEffect } from 'react'

// ** MUI Imports
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

const BillingHeader = ({ CompanyState }) => {
  useEffect(() => {}, [CompanyState])

  return (
    <Card sx={{ ml: 4, p: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { sm: 'row', xs: 'column' },
          justifyContent: { sm: 'space-between', xs: 'center' },
          gap: 12
        }}
      >
        <Box>
          {' '}
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar sx={{ width: 65, height: 65 }} alt={`Avatar n°`} src={CompanyState?.company?.LogoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                  {CompanyState?.company?.CompanyName}
                </Typography>
              }
              secondary={
                <Box sx={{ m: 3 }}>
                  <Typography variant='body2'>
                    {CompanyState?.company?.CompanyAdresse}, {CompanyState?.company?.CompanyCity},
                    {CompanyState?.company?.CompanyCountry}
                  </Typography>
                  <Typography variant='body2'>(+216) {CompanyState?.company?.CompanyPhoneNumber}</Typography>
                  <Typography variant='body2'>{CompanyState?.company?.CompanyEmail}</Typography>
                </Box>
              }
            />
          </ListItem>
        </Box>
        <Box>
          {' '}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
            <Box sx={{ mb: 2, display: 'flex' }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Creation date:
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {new Date(CompanyState?.billing?.creationDate).toDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Last modified:
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {new Date(CompanyState?.billing?.modifiedAt).toDateString()}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex' }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Modified by:
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {CompanyState?.billing?.modifiedBy?.firstName} {CompanyState?.billing?.modifiedBy?.lastName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

export default BillingHeader
