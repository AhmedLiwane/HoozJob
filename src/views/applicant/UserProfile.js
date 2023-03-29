// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from 'src/redux/User/action'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

const UserViewPage = ({ id }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  useEffect(() => {
    dispatch(getUser(id)).then(res => {
      if (res.data.code === 200) {
        setData(res.data.data)
      }
    })
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft data={data} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight data={data} />
      </Grid>
    </Grid>
  )
}

export default UserViewPage
