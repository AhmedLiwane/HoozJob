// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import Backdrop from '@mui/material/Backdrop'

// ** Demo Tabs Imports
import MyProfile from 'src/views/pages/account-settings/MyProfile'
import TabSecurity from 'src/views/pages/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const load = useSelector(state => state.MemberReducer.load)
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      {load ? (
        <Backdrop
          open={load}
          sx={{
            position: 'absolute',
            color: theme => theme.palette.common.white,
            zIndex: theme => theme.zIndex.mobileStepper - 1
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <Card>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label='account-settings tabs'
              sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Tab
                value='account'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountOutline sx={{ fontSize: '1.125rem' }} />
                    <TabName>Account</TabName>
                  </Box>
                }
              />
              <Tab
                value='security'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ fontSize: '1.125rem' }} />
                    <TabName>Security</TabName>
                  </Box>
                }
              />
            </TabList>

            <TabPanel sx={{ p: 0 }} value='account'>
              <MyProfile />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='security'>
              <TabSecurity />
            </TabPanel>
          </TabContext>
        </Card>
      )}
    </>
  )
}

export default AccountSettings
