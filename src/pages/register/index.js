// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** OtpComponent Imports
import OtpInput from 'react-otp-input'

// ** Shake effect

// ** MUI Components
import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MuiLink from '@mui/material/Link'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useRouter } from 'next/router'

const defaultValues = {
  firstname: '',
  lastname: '',
  companyname: '',
  email: '',
  website: '',
  password: '',
  expectedchecks: '',
  jobtitle: '',
  terms: false
}

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 430
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
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

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [otpSend, setOtpSend] = useState(false)
  const [LoadingBtn, setLoadingButton] = useState(false)
  const [Success, setSuccess] = useState(false)
  const [Error, setErrors] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
  const [Otp, setOtp] = useState('')
  const [email, setEmail] = useState('')

  // ** Hooks
  const theme = useTheme()
  const { register, checkOtp } = useAuth()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const router = useRouter()

  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
    website: yup.string().min(9).required(),
    jobtitle: yup.string().min(2).required(),
    companyname: yup.string().min(3).required(),
    expectedchecks: yup.string().min(1).required(),
    email: yup.string().email().required(),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    setLoadingButton(true)
    const { email, firstname, lastname, website, jobtitle, expectedchecks, password, companyname } = data
    setEmail(email)
    register({ email, firstname, lastname, website, jobtitle, expectedchecks, password, companyname }, response => {
      if (response?.data?.code === 200) {
        setErrors(false)
        setSuccess(true)
        setLoadingButton(false)
        setOtpSend(true)
        localStorage.setItem('idMember', response?.data?.id)
      } else {
        seterrorMessage(response?.response?.data?.description)
        setLoadingButton(false)
        setSuccess(false)
        setErrors(true)
      }
    })
  }

  const onOtp = otp => {
    const token = localStorage.getItem('idMember')
    checkOtp({ token, otp }, response => {
      if (response?.data?.code === 200) {
        toast.success(response?.data?.description)

        router.push('/login')
      } else {
        seterrorMessage(response?.response?.data?.description)
        setLoadingButton(false)
        setSuccess(false)
        setErrors(true)
      }
    })
  }

  useEffect(() => {
    if (Otp.length === 6) {
      onOtp(Otp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Otp])

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'
  const handleChange = otp => setOtp(otp)

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
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
            {!otpSend ? (
              <>
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant='h5'>Adventure starts here 🚀</TypographyStyled>
                  <Typography variant='body2'>Make your users's compliance easy and fun!</Typography>
                </Box>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'inline-flex' }}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title='Provide your first name as indicated in your ID document'
                      arrow
                      placement='top-start'
                    >
                      <FormControl sx={{ mb: 4 }}>
                        <Controller
                          name='firstname'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              value={value}
                              onBlur={onBlur}
                              label='First name'
                              onChange={onChange}
                              placeholder='John'
                            />
                          )}
                        />

                        {errors.firstname && (
                          <FormHelperText sx={{ color: 'error.main' }}>First name is required !</FormHelperText>
                        )}
                      </FormControl>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title='Provide your last name as indicated in your ID document'
                      arrow
                      placement='top-end'
                    >
                      <FormControl sx={{ mb: 4, ml: 4 }}>
                        <Controller
                          name='lastname'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              value={value}
                              onBlur={onBlur}
                              label='Last name'
                              onChange={onChange}
                              placeholder='Doe'
                            />
                          )}
                        />

                        {errors.lastname && (
                          <FormHelperText sx={{ color: 'error.main' }}>Last name is required !</FormHelperText>
                        )}
                      </FormControl>
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'inline-flex' }}>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title='Provide a full name of the Company that you represent'
                      arrow
                      placement='top-start'
                    >
                      <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                          name='companyname'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              value={value}
                              label='Company'
                              onBlur={onBlur}
                              onChange={onChange}
                              placeholder='Company Name LLC'
                            />
                          )}
                        />
                        {errors.companyname && (
                          <FormHelperText sx={{ color: 'error.main' }}>Company name is required !</FormHelperText>
                        )}
                      </FormControl>
                    </Tooltip>
                    <FormControl fullWidth sx={{ mb: 4, ml: 4 }}>
                      <Controller
                        name='jobtitle'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            value={value}
                            label='Job Title'
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='CEO , CTO , COO ..'
                          />
                        )}
                      />
                      {errors.jobtitle && (
                        <FormHelperText sx={{ color: 'error.main' }}>Job title is required !</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title='Provide your corporate email address'
                    arrow
                    placement='top'
                  >
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            value={value}
                            label='Email'
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='jhon@company.com'
                          />
                        )}
                      />
                      {errors.email && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Tooltip>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='website'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          value={value}
                          label='Company Website'
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder='www.company.com'
                        />
                      )}
                    />
                    {errors.website && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        Please provide your company's website
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='expectedchecks'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          value={value}
                          label='Expected checks (per month)'
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder='10,20,30..1000 / month'
                        />
                      )}
                    />
                    {errors.expectedchecks && (
                      <FormHelperText sx={{ color: 'error.main' }}>Expected checks is required ! </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                      Password
                    </InputLabel>
                    <Controller
                      name='password'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <OutlinedInput
                          value={value}
                          label='Password'
                          onBlur={onBlur}
                          onChange={onChange}
                          id='auth-login-v2-password'
                          error={Boolean(errors.password)}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
                    <Controller
                      name='terms'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <FormControlLabel
                            sx={{
                              ...(errors.terms ? { color: 'error.main' } : null),
                              '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                            }}
                            control={
                              <Checkbox
                                checked={value}
                                onChange={onChange}
                                sx={errors.terms ? { color: 'error.main' } : null}
                              />
                            }
                            label={
                              <Fragment>
                                <Typography
                                  variant='body2'
                                  component='span'
                                  sx={{ color: errors.terms ? 'error.main' : '' }}
                                >
                                  I agree to{' '}
                                </Typography>
                                <Link href='/' passHref>
                                  <Typography
                                    variant='body2'
                                    component={MuiLink}
                                    sx={{ color: 'primary.main' }}
                                    onClick={e => e.preventDefault()}
                                  >
                                    privacy policy & terms
                                  </Typography>
                                </Link>
                              </Fragment>
                            }
                          />
                        )
                      }}
                    />
                    {errors.terms && (
                      <FormHelperText sx={{ mt: -5, mb: 5, color: 'error.main' }}>
                        {errors.terms.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <LoadingButton
                    loading={LoadingBtn}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mb: 7 }}
                  >
                    Sign up
                  </LoadingButton>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
                    <Typography>
                      <Link passHref href='/login'>
                        <Typography component={MuiLink} sx={{ color: 'primary.main' }}>
                          Sign in instead
                        </Typography>
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </>
            ) : (
              <Box
                sx={{
                  p: 7,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper'
                }}
              >
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant='h5'>Verify it's you !</TypographyStyled>
                  <Typography variant='body2'>
                    We ve send the confirmation code to <strong>{email}</strong>
                  </Typography>
                </Box>
                <OtpInput
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '4px',
                    fontSize: '2rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.3)'
                  }}
                  value={Otp}
                  hasErrored={Error}
                  errorStyle={{ border: '1px solid red' }}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span>-</span>}
                />
              </Box>
            )}
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
