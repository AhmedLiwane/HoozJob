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
import Backdrop from '@mui/material/Backdrop'

// ** Demo Tabs Imports
import TabAccount from 'src/views/pages/account-settings/TabAccount'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from 'src/redux/User/action'
import { useRouter } from 'next/router'
import TabFavorites from 'src/views/pages/account-settings/TabFavoriites'
import TabTransactions from 'src/views/pages/account-settings/TabTransactions'
import TabProvider from 'src/views/pages/account-settings/TabProvider'
import { useSelector } from 'react-redux'
import { AccountDetails, AccountStar, BookMarker, Star, ViewList } from 'mdi-material-ui'

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

const UserProfile = () => {
  // ** Hooks
  const userState = useSelector(state => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query

  // ** State
  const [value, setValue] = useState('account')
  const [loading, setLoading] = useState(false)
  const [isProvider, setIsProvider] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setIsProvider(userState.user)
  }, [userState.user])

  useEffect(() => {
    setLoading(true)
    dispatch(getUser(id)).then(res => {
      setLoading(false)
      if (res.data.code === 200) {
        setIsProvider(res.data.data.Status)
      }
    })
  }, [])

  return (
    <>
      {loading ? (
        <Backdrop
          open={loading}
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
                value='transactions'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ViewList sx={{ fontSize: '1.125rem' }} />
                    <TabName>Transactions</TabName>
                  </Box>
                }
              />{' '}
              <Tab
                value='favorites'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ fontSize: '1.125rem' }} />
                    <TabName>Favorites</TabName>
                  </Box>
                }
              />{' '}
              {isProvider === 'Pending' || isProvider === 'Pro' ? (
                <Tab
                  value='provider'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountDetails sx={{ fontSize: '1.125rem' }} />
                      <TabName>Provider Info</TabName>
                    </Box>
                  }
                />
              ) : null}
            </TabList>

            <TabPanel sx={{ p: 0 }} value='account'>
              <TabAccount />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='transactions'>
              <TabTransactions />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='favorites'>
              <TabFavorites />
            </TabPanel>
            {isProvider === 'Pending' || isProvider === 'Pro' ? (
              <TabPanel sx={{ p: 0 }} value='provider'>
                <TabProvider />
              </TabPanel>
            ) : null}
          </TabContext>
        </Card>
      )}
    </>
  )
}

export default UserProfile
