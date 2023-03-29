// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addAdmin } from 'src/redux/Teammember/action'
import { FormTextboxPassword } from 'mdi-material-ui'
import { useEffect } from 'react'

const AddAdminLayout = ({ imgSrc }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    userFullName: '',
    email: '',
    password: '',
    Selfie: imgSrc
  })

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    setValues({ ...values, Selfie: imgSrc })
  }, [imgSrc])

  const saveChanges = async () => {
    setLoading(true)

    const result = dispatch(addAdmin(values)).then(res => {
      setLoading(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Added admin successfully !',
      error: 'Something went wrong !'
    })
  }

  return (
    <Card>
      <CardHeader title='Add admin details' titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='userFullName'
                label='Full Name'
                onChange={onChangeInfo}
                placeholder={"Admin's full name"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='email'
                type='email'
                label='Email'
                onChange={onChangeInfo}
                placeholder={'example@gmail.com'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='password'
                type='password'
                label='Password'
                onChange={onChangeInfo}
                placeholder={'*********'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FormTextboxPassword />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                onClick={() => saveChanges()}
                color='success'
                variant='contained'
                sx={{ mr: 4 }}
              >
                Create admin
              </LoadingButton>
              <Button type='reset' variant='outlined' color='error'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddAdminLayout
