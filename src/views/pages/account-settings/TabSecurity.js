// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Icons Imports
import Key from 'mdi-material-ui/Key'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useSelector } from 'react-redux'
import { changePassword } from 'src/redux/Teammember/action'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FAIL_USER } from 'src/redux/actionTypes'
import LoadingButton from '@mui/lab/LoadingButton'
import toast from 'react-hot-toast'

const TabSecurity = () => {
  const MemberState = useSelector(state => state.MemberReducer)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    setShow(MemberState.error)
    if (MemberState.msg === 'Your new password cannot be your old one') {
      setError2(true)
    } else if (MemberState.msg === "Password doesn't match your current one") {
      setError1(true)
    } else if (MemberState.msg === "Your new passwords don't match") {
      setError2(true)
      setError3(true)
    }
  }, [MemberState.error, MemberState.msg])

  // ** States
  const [show, setShow] = useState(MemberState.error)
  const [LoadingBtn, setLoadingButton] = useState(false)
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)

  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const resetPassword = async () => {
    if (values.newPassword !== values.confirmNewPassword) {
      toast.error("Your new passwords don't match")
    } else {
      setLoadingButton(true)

      dispatch(changePassword(values))
        .then(res => {
          if (res.data.code === 200) {
            toast.success('Password changed')
            setLoadingButton(false)
          }
        })
        .catch(err => {
          toast.error(err.response.data.message)
          setLoadingButton(false)
        })
    }
  }

  return (
    <form>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} sx={{ mt: 5, mb: [0, 6] }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Collapse in={show} sx={{ mb: 4 }}>
                  <Alert
                    severity='error'
                    action={
                      <IconButton
                        size='small'
                        color='inherit'
                        aria-label='close'
                        onClick={() => {
                          setShow(false)
                          setError1(false)
                          setError2(false)
                          setError3(false)
                        }}
                      >
                        <Close fontSize='inherit' />
                      </IconButton>
                    }
                  >
                    <AlertTitle>Failed</AlertTitle>
                    {MemberState.msg}
                  </Alert>
                </Collapse>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password' error={error1}>
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    error={error1}
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password' error={error2}>
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    error={error2}
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password' error={error3}>
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    error={error3}
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={6} xs={12} sx={{ display: 'flex', mt: 2.5, alignItems: 'flex-end', justifyContent: 'center' }}>
            <img alt='avatar' src='/images/pages/account-settings-security-illustration.png' />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 0, mb: 6 }} />

        <Box>
          <LoadingButton
            loading={LoadingBtn}
            disabled={
              values.confirmNewPassword === '' || values.currentPassword === '' || values.newPassword === ''
                ? true
                : false
            }
            onClick={() => resetPassword(values)}
            variant='contained'
            sx={{ mr: 4 }}
          >
            Save Changes
          </LoadingButton>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}

export default TabSecurity
