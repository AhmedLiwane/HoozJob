// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from 'src/redux/User/action'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { HomeSearch } from 'mdi-material-ui'
import { updateAdmin } from 'src/redux/Teammember/action'

const AdminLayout = ({ imgSrc }) => {
  // ** Hooks
  const AdminState = useSelector(state => state.MemberReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    uerFullName: AdminState?.admin?.userFullName,
    email: AdminState?.admin?.Email,
    Selfie: imgSrc
  })

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const saveChanges = async () => {
    setLoading(true)

    const result = dispatch(updateAdmin(id, values)).then(res => {
      setLoading(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Updated admin successfully !',
      error: 'Something went wrong !'
    })
  }

  useEffect(() => {
    setValues({ ...values, Selfie: imgSrc })
  }, [imgSrc])

  return (
    <Card>
      <CardHeader title='Personal Informations' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='userFullName'
                label='Full Name'
                onChange={onChangeInfo}
                placeholder={AdminState?.admin?.userFullName}
                defaultValue={AdminState?.admin?.userFullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='email'
                type='email'
                label='Email'
                onChange={onChangeInfo}
                placeholder={AdminState?.admin?.Email || ''}
                defaultValue={AdminState?.admin?.Email || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={loading} onClick={() => saveChanges()} variant='contained' sx={{ mr: 4 }}>
                Save Changes
              </LoadingButton>
              <Button type='reset' variant='outlined' color='secondary'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AdminLayout
