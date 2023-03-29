// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { useSelector } from 'react-redux'
import { Badge, Rating } from '@mui/material'
import FormLayoutsIcons from 'src/views/forms/form-layouts/FormLayoutsIcons'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { updateProRequest } from 'src/redux/Teammember/action'
import { getUser } from 'src/redux/User/action'
import toast from 'react-hot-toast'
import { useState } from 'react'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  //** Hooks
  const UserState = useSelector(state => state.UserReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [imgSrc, setImgSrc] = useState(UserState?.user?.Selfie || '/images/avatars/1.png')

  const userStatus = {
    Declined: 'error',
    Normal: 'secondary',
    Pending: 'warning',
    Pro: 'success'
  }

  const updateRequest = async result => {
    const myPromise = dispatch(updateProRequest(id, result)).then(res => {
      if (res.data.code === 200) {
        dispatch(getUser(id))
      }
    })
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: 'Updated Pro request',
      error: 'Something went wrong'
    })
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge badgeContent={UserState.user.Status} color={userStatus[UserState.user.Status]}>
                <ImgStyled src={imgSrc} alt='Profile Pic' sx={{ objectFit: 'cover' }} />
              </Badge>

              <Box>
                {UserState.user.isProvider ? (
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 250, marginTop: '5px' }}>Not rated yet</Typography>
                    <Rating value={UserState?.user?.providerInfo?.rate} readOnly name='read-only' />
                  </Box>
                ) : null}
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {UserState.user.Status === 'Pending' ? (
                  <>
                    <ButtonStyled
                      sx={{ marginLeft: 3 }}
                      color='success'
                      component='label'
                      onClick={() => updateRequest(true)}
                      variant='outlined'
                    >
                      Accept pro request
                    </ButtonStyled>
                    <ResetButtonStyled color='error' variant='outlined' onClick={() => updateRequest(false)}>
                      Decline pro request
                    </ResetButtonStyled>
                  </>
                ) : UserState.user.Status === 'Normal' ? (
                  <ButtonStyled
                    sx={{ marginLeft: 3 }}
                    color='success'
                    component='label'
                    onClick={() => updateRequest(true)}
                    variant='outlined'
                  >
                    Grant Pro
                  </ButtonStyled>
                ) : UserState.user.Status === 'Pro' ? (
                  <ButtonStyled
                    sx={{ marginLeft: 3 }}
                    color='error'
                    component='label'
                    onClick={() => updateRequest(false)}
                    variant='outlined'
                  >
                    Revoke Pro
                  </ButtonStyled>
                ) : (
                  <>
                    <ButtonStyled
                      sx={{ marginLeft: 3 }}
                      color='success'
                      component='label'
                      onClick={() => updateRequest(true)}
                    >
                      Grant Pro
                    </ButtonStyled>
                    <ButtonStyled
                      sx={{ marginLeft: 3 }}
                      color='secondary'
                      component='label'
                      onClick={() => updateRequest('Normal')}
                      variant='outlined'
                    >
                      Return Normal
                    </ButtonStyled>
                  </>
                )}
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 500, fontSize: 15, marginTop: 2 }}>
              Created at: {new Date(UserState.user.creationDate).toDateString()}
            </Typography>
          </Grid>
          <FormLayoutsIcons imgSrc={imgSrc} />
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
