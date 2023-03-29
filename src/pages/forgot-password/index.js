// ** Next Imports
import Link from 'next/link'

// ** React Imports

import { useState } from 'react'

// ** MUI Components
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import FormControl from '@mui/material/FormControl'
import MuiLink from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useAuth } from 'src/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Icons Imports
import ChevronLeft from 'mdi-material-ui/ChevronLeft'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const ForgotPasswordRecieved = styled('img')(({ theme }) => ({
  maxWidth: '25rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '25rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '15rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const schema = yup.object().shape({
    email: yup.string().email().required()
  })

  const [LoadingBtn, setLoadingButton] = useState(false)
  const [Success, setSuccess] = useState(false)
  const [Error, setErrors] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    setLoadingButton(true)
    const { email } = data

    auth.resetPassword({ email }, respense => {
      if (respense?.data?.code === 200) {
        setErrors(false)
        setLoadingButton(false)
        setSuccess(true)
      } else {
        setSuccess(false)
        seterrorMessage(respense?.response?.data?.description)
        setErrors(true)
        setLoadingButton(false)
        setError('email', {
          type: 'manual',
          message: 'Email is invalid !'
        })
      }
    })
  }
  const auth = useAuth()

  const imageSource =
    skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <ForgotPasswordIllustrationWrapper>
            <ForgotPasswordIllustration
              alt='forgot-password-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </ForgotPasswordIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-forgot-password-mask-${theme.palette.mode}.png`} />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint0_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fillOpacity='0.4'
                  fill='url(#paint1_linear_7821_79167)'
                  transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                />
                <rect
                  rx='25.1443'
                  width='50.2886'
                  height='143.953'
                  fill={theme.palette.primary.main}
                  transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                />
                <defs>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint0_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                  <linearGradient
                    y1='0'
                    x1='25.1443'
                    x2='25.1443'
                    y2='143.953'
                    id='paint1_linear_7821_79167'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop />
                    <stop offset='1' stopOpacity='0' />
                  </linearGradient>
                </defs>
              </svg>
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
              <Typography variant='body2'>
                Enter your email and we&prime;ll send you instructions to reset your password
              </Typography>
            </Box>

            <Collapse in={Error} sx={{ mb: 4 }}>
              <Alert
                severity='error'
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setErrors(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Failed</AlertTitle>
                {errorMessage}
              </Alert>
            </Collapse>
            {!Success ? (
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label='Email'
                        value={value || ''}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder='Email adresse..'
                        sx={{ display: 'flex' }}
                      />
                    )}
                  />
                  <LoadingButton
                    loading={LoadingBtn}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mb: 5.25, mt: 4 }}
                  >
                    Send reset link
                  </LoadingButton>
                </FormControl>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link passHref href='/login'>
                    <Typography
                      component={MuiLink}
                      sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                    >
                      <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                      <span>Back to login</span>
                    </Typography>
                  </Link>
                </Typography>
              </form>
            ) : (
              <>
                <Collapse in={Success} sx={{ my: 4 }}>
                  <Alert>
                    <AlertTitle>Success</AlertTitle>
                    Your reset password email is heading your way.<strong> Check it out</strong>
                  </Alert>
                </Collapse>
                <ForgotPasswordRecieved
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  alt='forgot-password-Recieved'
                  src={`/images/pages/auth-v2-forgot-password-recieved.png`}
                />

                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link passHref href='/login'>
                    <Typography
                      component={MuiLink}
                      sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', justifyContent: 'center' }}
                    >
                      <ChevronLeft sx={{ mr: 1.5, fontSize: '2rem' }} />
                      <span>Back to login</span>
                    </Typography>
                  </Link>
                </Typography>
              </>
            )}
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.guestGuard = true
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
