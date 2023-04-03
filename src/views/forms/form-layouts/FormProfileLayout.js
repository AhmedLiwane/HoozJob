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
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { updateProfile } from 'src/redux/Teammember/action'
import axios from 'axios'
import { useEffect } from 'react'

const FormLayoutsIcons = ({ imgSrc }) => {
  // ** Hooks
  const adminState = useSelector(state => state.MemberReducer)
  const dispatch = useDispatch()

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    userFullName: adminState.admin?.userFullName,
    email: adminState.admin?.Email,
    Selfie: imgSrc
  })

  useEffect(() => {
    setValues({ ...values, Selfie: imgSrc })
  }, [imgSrc])

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const saveChanges = async () => {
    setLoading(true)
    console.log('here')
    await axios
      .post('https://api.hoozjob.com/api/backoffice/editProfile', values, { withCredentials: true })

      // const result = dispatch(updateProfile(values))
      .then(res => {
        toast.success('Updated profile successfully !')
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response.data.message)
        setLoading(false)
      })
  }

  return (
    <Card>
      <CardHeader title='Personal Informations' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='userFullName'
                label='Full Name'
                onChange={onChangeInfo}
                placeholder={adminState?.admin?.userFullName}
                defaultValue={adminState?.admin?.userFullName}
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
                placeholder={adminState?.admin?.Email}
                defaultValue={adminState?.admin?.Email}
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
              <LoadingButton loading={loading} onClick={saveChanges} variant='contained' sx={{ mr: 4 }}>
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
