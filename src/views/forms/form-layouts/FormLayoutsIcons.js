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

const FormLayoutsIcons = ({ imgSrc }) => {
  // ** Hooks
  const UserState = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    uerFullName: UserState.user?.userFullName,
    email: UserState.user?.userEmail?.Email,
    number: UserState.user?.userPhoneNumber?.Number,
    address: UserState.user?.address,
    Selfie: imgSrc,
    longitude: UserState.user?.geometry?.coordinates[0],
    latitude: UserState.user?.geometry?.coordinates[1]
  })

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const saveChanges = async () => {
    setLoading(true)

    const result = dispatch(updateUser(id, values)).then(res => {
      setLoading(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Updated user successfully !',
      error: 'Something went wrong !'
    })
  }

  useEffect(() => {
    setValues({ ...values, Selfie: imgSrc })
    console.log(values)
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
                placeholder={UserState?.user?.userFullName}
                defaultValue={UserState?.user?.userFullName}
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
                placeholder={UserState?.user?.userEmail?.Email || ''}
                defaultValue={UserState?.user?.userEmail?.Email || ''}
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
              <TextField
                fullWidth
                id='number'
                type='text'
                label='Phone No.'
                onChange={onChangeInfo}
                placeholder={UserState?.user?.userPhoneNumber?.Number || ''}
                defaultValue={UserState?.user?.userPhoneNumber?.Number || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='text'
                id='address'
                label='Address'
                onChange={onChangeInfo}
                placeholder={UserState?.user?.address || ''}
                defaultValue={UserState?.user?.address || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HomeSearch />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ marginRight: 5 }}
                type='text'
                id='longitude'
                label='Longitude'
                onChange={onChangeInfo}
                placeholder={UserState?.user?.geometry?.coordinates[0] || ''}
                defaultValue={UserState?.user?.geometry?.coordinates[0] || ''}
              />
              <TextField
                type='text'
                id='latitude'
                label='Latitude'
                onChange={onChangeInfo}
                placeholder={UserState?.user?.geometry?.coordinates[1] || ''}
                defaultValue={UserState?.user?.geometry?.coordinates[1] || ''}
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

export default FormLayoutsIcons
