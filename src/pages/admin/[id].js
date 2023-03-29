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

// ** Demo Tabs Imports
import TabAdmin from 'src/views/pages/admin/Admin'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getAdmin } from 'src/redux/Teammember/action'
import { Backdrop, CircularProgress } from '@mui/material'
import { useEffect } from 'react'

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

const AdminProfile = () => {
  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query

  // ** State
  const [value, setValue] = useState('account')
  const [loading, setLoading] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getAdmin(id)).then(res => {
      setLoading(false)
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
                    <TabName>Admin Info</TabName>
                  </Box>
                }
              />
            </TabList>

            <TabPanel sx={{ p: 0 }} value='account'>
              <TabAdmin />
            </TabPanel>
          </TabContext>
        </Card>
      )}
    </>
  )
}

export default AdminProfile
