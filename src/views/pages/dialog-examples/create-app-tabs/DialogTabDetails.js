// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import LicenseIcon from 'mdi-material-ui/LicenseIcon'
import CartOutline from 'mdi-material-ui/CartOutline'
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDetails = ({ handleAppName }) => {
  return (
    <Box>
      <TextField
        onChange={handleAppName}
        fullWidth
        sx={{ mb: 4 }}
        label='Application Name'
        placeholder='My first app'
      />
      <Typography variant='h6' sx={{ mb: 4 }}>
        Category
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <BriefcaseOutline />
            </CustomAvatar>
            <Box>
              <Typography sx={{ color: 'text.secondary' }}>KYC</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Know your customer
              </Typography>
            </Box>
          </Box>
          <Radio value='crm' checked />
        </Box>
        <Box sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <CartOutline />
            </CustomAvatar>
            <Box>
              <Typography sx={{ color: 'text.secondary' }}>KYB</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Know your business{' '}
              </Typography>
            </Box>
          </Box>
          <Radio value='ecommerce' disabled />
        </Box>
        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <LicenseIcon />
            </CustomAvatar>
            <Box>
              <Typography sx={{ color: 'text.secondary' }}>Risk scoring / AML</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                The risk rating determines the credit approval process.
              </Typography>
            </Box>
          </Box>
          <Radio value='learning' disabled />
        </Box>
      </Box>
    </Box>
  )
}

export default TabDetails
