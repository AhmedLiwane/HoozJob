// ** React Imports
import { useState, forwardRef, Fragment, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import QRCode from 'react-qr-code'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import ChevronLeft from 'mdi-material-ui/ChevronLeft'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useSelector } from 'react-redux'
import CompleteProfile from 'src/views/CompleteProfile'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogTestVerification = () => {
  // ** Hooks
  const { settings } = useSettings()
  const CompanyState = useSelector(state => state.CompanyReducer)
  const MemberState = useSelector(state => state.MemberState)

  // ** States
  const [LoadingBtn, setLoadingButton] = useState(false)
  const [show, setShow] = useState(false)
  const [authType, setAuthType] = useState('app')
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [sandboxDialog, setSandboxDialog] = useState(false)
  const [verificationLink, setVerificationLink] = useState('')

  const [CopyLink, setCopyLink] = useState('copy link')
  const [applicationID, setapplicationID] = useState('')
  const [sandboxResult, setSandboxResult] = useState('')

  // ** Var
  const { direction } = settings

  const openLink = () => {
    window.open(verificationLink, '_blank').focus()
  }

  const handleAuthDialogClose = () => {
    if (show) {
      setShow(false)
    }

    setShowAuthDialog(false)
    if (authType !== 'app') {
      setTimeout(() => {
        setAuthType('app')
      }, 250)
    }
  }

  const copyLink = () => {
    setCopyLink('copied')
    navigator.clipboard.writeText(verificationLink)
    setTimeout(() => {
      setCopyLink('copy link')
    }, 2000)
  }

  const createSession = () => {
    setLoadingButton(true)

    const headers = {
      'x-app-token': applicationID,
      'x-company-token': localStorage.getItem('accessToken')
    }
    axios
      .post(
        'http://localhost:5000/api/backoffice/createSession',
        {
          externalUserId: ''
        },
        { headers }
      )
      .then(res => {
        setShow(false)
        setSandboxDialog(false)
        setShowAuthDialog(true)
        setVerificationLink(res.data.url)
        setLoadingButton(false)
      })
      .catch(err => {
        setLoadingButton(false)
      })
  }

  const createSandboxSession = () => {
    setLoadingButton(true)

    const headers = {
      'x-app-token': applicationID,
      'x-company-token': localStorage.getItem('accessToken')
    }

    axios
      .post(
        'https://sandbox-api.HoozJob.io/v1/createSession',
        {
          result: sandboxResult
        },
        { headers }
      )
      .then(res => {
        setShow(false)
        setSandboxDialog(false)
        setShowAuthDialog(true)
        setVerificationLink(res.data.url)
        setLoadingButton(false)
      })
      .catch(err => {
        setLoadingButton(false)
      })
  }

  // ** States
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [incomplete, setIncomplete] = useState(false)
  const [options2, setOptions2] = useState(['Accepted', 'Refused', 'Manuel'])
  const loading = open && options.length === 0
  useEffect(() => {
    let active = true
    if (!loading) {
      return undefined
    }

    const fetchData = async () => {
      const headers = { 'x-company-token': localStorage.getItem('accessToken') }
      const response = await axios.get('http://localhost:5000/api/backoffice/getAllApplications', { headers })
      const data = await response.data.foundApplications
      if (active && data[0]) {
        setOptions(Object.keys(data).map(key => data[key]))
      }
    }
    fetchData()

    return () => {
      active = false
    }
  }, [loading])

  const isComplete = () => {
    if (CompanyState?.company?.CompanyRegistrationNumber == '' || MemberState?.admin?.PhoneNumber == '') {
      setIncomplete(true)
    } else {
      setShow(true)
    }
  }

  const callBack = prop => {
    setIncomplete(prop)
  }
  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])
  const Arrow = direction === 'ltr' ? ChevronRight : ChevronLeft

  return (
    <>
      <Box sx={{ textAlign: 'left' }}>
        <CompleteProfile isOpen={incomplete} callBack={callBack} />

        <Button loading={LoadingBtn} variant='contained' sx={{ mb: 2.5, whiteSpace: 'nowrap' }} onClick={isComplete}>
          Verification Link
        </Button>
        <Typography variant='body2'>Test your verification before going live.</Typography>
      </Box>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={handleAuthDialogClose}
        onBackdropClick={handleAuthDialogClose}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={handleAuthDialogClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                  Please select an application to test
                </Typography>
                <Typography variant='body2' sx={{ mb: 6 }}>
                  You dont have Application yet ? <strong>Create one.</strong>
                </Typography>
                <Autocomplete
                  noOptionsText='No data'
                  open={open}
                  options={options}
                  loading={loading}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  id='autocomplete-asynchronous-request'
                  onChange={(event, newValue) => {
                    newValue ? setapplicationID(newValue?.publicKey) : setapplicationID('')
                  }}
                  getOptionLabel={option => option.appName}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Select one...'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        )
                      }}
                    />
                  )}
                />
                <Typography
                  variant='body2'
                  sx={{ mt: 6, textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() =>
                    CompanyState?.company?.IsSandbox ? (setSandboxDialog(true), setShow(false)) : createSession()
                  }
                >
                  <strong>Continue using the system's defalt settings</strong>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton
                loading={LoadingBtn}
                variant='contained'
                disabled={applicationID == '' ? true : false}
                endIcon={<Arrow />}
                onClick={() =>
                  CompanyState?.company?.IsSandbox ? (setSandboxDialog(true), setShow(false)) : createSession()
                }
              >
                Continue
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        open={sandboxDialog}
        maxWidth='md'
        scroll='body'
        onClose={() => setSandboxDialog(false)}
        onBackdropClick={() => setSandboxDialog(false)}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setSandboxDialog(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                  Please select the result you would like to test
                </Typography>
                <Autocomplete
                  noOptionsText='No data'
                  open={open}
                  options={options2}
                  loading={loading}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  id='autocomplete-asynchronous-request'
                  onChange={(event, newValue) => {
                    newValue ? setSandboxResult(newValue) : setSandboxResult('')
                  }}
                  getOptionLabel={option => option}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Select one...'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        )
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LoadingButton
                loading={LoadingBtn}
                variant='contained'
                disabled={sandboxResult == '' ? true : false}
                endIcon={<Arrow />}
                onClick={() => createSandboxSession()}
              >
                Continue
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth='md'
        scroll='body'
        open={showAuthDialog}
        onClose={handleAuthDialogClose}
        TransitionComponent={Transition}
        onBackdropClick={handleAuthDialogClose}
      >
        <DialogContent sx={{ px: { xs: 8, sm: 15 }, py: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={handleAuthDialogClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box>
                <Typography variant='h5' sx={{ mb: 4, textAlign: 'center' }}>
                  Verification Link
                </Typography>
                <Typography variant='h6'>Before going live</Typography>
                <Typography variant='body2' sx={{ mb: 4 }}>
                  Use testing to make sure your Application integration handles different flows correctly. Use test mode
                  to simulate live mode while taking advantage of HoozJob special tokens to use in your tests.
                </Typography>

                <Box sx={{ my: 12, display: 'flex', justifyContent: 'center' }}>
                  <QRCode value={verificationLink} size={122} />
                </Box>

                <Alert severity='warning' icon={false} sx={{ mb: 4, '& .MuiAlert-message': { overflow: 'hidden' } }}>
                  <AlertTitle sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Can't Scan ?
                  </AlertTitle>
                  If you having trouble using the QR code, select manual entry on your navigator
                </Alert>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
                >
                  <OutlinedInput
                    fullWidth
                    value={verificationLink}
                    sx={{ mr: [0, 4] }}
                    placeholder='Verification Link'
                    readOnly={true}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Button onClick={() => copyLink()} size='small'>
                          {CopyLink}
                        </Button>
                      </InputAdornment>
                    }
                  />
                  <Button
                    variant='contained'
                    sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                    endIcon={<Arrow />}
                    onClick={() => {
                      openLink()
                    }}
                  >
                    Open
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogTestVerification
