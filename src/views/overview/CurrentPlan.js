// ** React Imports
import { React, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import DialogContentText from '@mui/material/DialogContentText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Card } from '@mui/material'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const Currentplan = ({ CompanyState }) => {
  // ** States
  const [openUpgradePlans, setOpenUpgradePlans] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [selectPlan, setSelectPlan] = useState('P1')

  const dispatch = useDispatch()
  const route = useRouter()

  // Handle Upgrade Plan dialog
  const handleUpgradePlansClickOpen = () => setOpenUpgradePlans(true)

  const handleUpgradePlansClose = () => {
    setOpenUpgradePlans(false)
    setSelectPlan('P1')
  }

  const date = () => {
    if (CompanyState?.billing?.expiration != 'None') {
      var eventdate = moment(CompanyState?.billing?.expiration)

      // var eventdate = moment('2022-10-02')
      var todaysdate = moment()
      const daysLeft = eventdate.diff(todaysdate, 'days')

      return (
        <CustomChip
          skin='light'
          label={new Date(CompanyState?.billing?.expiration).toDateString()}
          color={daysLeft > 5 ? 'success' : daysLeft > 3 ? 'warning' : 'error'}
          sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px', ml: 2 }}
        />
      )
    } else {
      return (
        <CustomChip
          skin='light'
          label='Free'
          color='secondary'
          sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px', ml: 2 }}
        />
      )
    }
  }

  const plan = e => {
    setSelectPlan(e.target.value)
  }

  const handlePage = url => {
    if (url) {
      route.push(url)
    }
  }

  return (
    <Card>
      <CardHeader title='Current plan' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant='body2' sx={{ mb: 1 }}>
                Your Current Plan is{' '}
                <CustomChip
                  skin='light'
                  label={CompanyState?.billing?.currentPlan}
                  color={
                    CompanyState?.billing?.currentPlan?.includes('PE')
                      ? 'info'
                      : CompanyState?.billing?.currentPlan?.includes('P1', 'P2', 'P3')
                      ? 'primary'
                      : 'secondary'
                  }
                  sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px', ml: 2 }}
                />
              </Typography>
              <Typography variant='body2'>A simple start for everyone</Typography>
            </Box>
            <Box sx={{ mb: 4.5 }}>
              <Typography sx={{ mb: 1, fontWeight: 500, fontSize: '.875rem' }}>Experation date :{date()}</Typography>
              <Typography variant='body2'>We will send you a notification upon Subscription expiration</Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>720DT Per Month</Typography>
                <CustomChip
                  skin='light'
                  label='Popular'
                  color='primary'
                  sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px' }}
                />
              </Box>
              <Typography variant='body2'>Standard plan for small to medium businesses</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: [4, 4, 0] }}>
            <Alert
              icon={false}
              severity={
                CompanyState?.billing?.verificationsLeft > 5
                  ? 'info'
                  : CompanyState?.billing?.verificationsLeft > 3
                  ? 'warning'
                  : 'error'
              }
              sx={{ mb: 4 }}
            >
              {CompanyState?.billing?.verificationsLeft < 5 ? (
                <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                  We need your attention!
                </AlertTitle>
              ) : (
                ''
              )}
              <AlertTitle>Verifications left : {CompanyState?.billing?.verificationsLeft}</AlertTitle>
              {CompanyState?.billing?.verificationsLeft < 5 ? 'Your plan requires update' : ''}
            </Alert>
            <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                Verifications
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {CompanyState?.billing?.verificationsLeft} Left
              </Typography>
            </Box>
            <LinearProgress
              value={CompanyState?.billing?.verificationsLeft}
              variant='determinate'
              sx={{ height: 10, borderRadius: '5px' }}
            />
            <Typography variant='caption' sx={{ mt: 2, mb: 4 }}>
              {CompanyState?.billing?.verificationsLeft < 5 ? 'Your plan requires update' : ''}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Button variant='contained' sx={{ mr: 4, mb: [3, 0] }} onClick={handleUpgradePlansClickOpen}>
              Upgrade Plan
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {/* UPGRADE MODAL */}
      <Dialog
        open={openUpgradePlans}
        onClose={handleUpgradePlansClose}
        aria-labelledby='user-view-plans'
        aria-describedby='user-view-plans-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, pt: 8, pb: 8 } }}
      >
        <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          Upgrade Plan
        </DialogTitle>

        <DialogContent>
          <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
            Choose the best plan for the user.
          </DialogContentText>
        </DialogContent>

        <DialogContent
          sx={{
            pb: 8,
            pr: [6, 15],
            pl: [6, 15],
            display: 'flex',
            alignItems: 'center',
            flexWrap: ['wrap', 'nowrap'],
            pt: theme => `${theme.spacing(2)} !important`
          }}
        >
          <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
            <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
            <Select
              label='Choose Plan'
              defaultValue='P1'
              id='user-view-plans-select'
              labelId='user-view-plans-select-label'
              onChange={plan}
            >
              {CompanyState?.packs?.monthly?.map(pack => {
                return (
                  <MenuItem value={pack.title} key={pack.title}>
                    {pack.title} &nbsp; &nbsp;
                    <Typography variant='caption'>{pack.subtitle}</Typography>
                  </MenuItem>
                )
              })}

              <Divider />
              {CompanyState?.packs?.annually?.map(pack => {
                return (
                  <MenuItem value={pack.title} key={pack.title}>
                    {pack.title} &nbsp; &nbsp;
                    <Typography variant='caption'>{pack.subtitle}</Typography>
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <LoadingButton loading={loadingButton} variant='contained' sx={{ minWidth: ['100%', 0] }} onClick={''}>
            Upgrade
          </LoadingButton>
        </DialogContent>

        <Divider sx={{ m: 0 }} />

        <DialogContent sx={{ pt: 8, pl: [6, 15], pr: [6, 15] }}>
          <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem' }}>
            User current plan is {CompanyState?.billing?.currentPlan}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: 'space-between'
            }}
          >
            {selectPlan.includes('PE')
              ? CompanyState?.packs?.annually?.map(pack => {
                  if (selectPlan === pack.title) {
                    return (
                      <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }} key={pack.title}>
                        <Sup>{pack.unit}</Sup>
                        <Typography
                          variant='h3'
                          sx={{
                            mb: -1.2,
                            lineHeight: 1,
                            color: 'primary.main',
                            fontSize: '3rem !important',
                            ml: 8
                          }}
                        >
                          {pack.price}
                        </Typography>
                        <Sub>/ {pack.plan}</Sub>
                      </Box>
                    )
                  }
                })
              : CompanyState?.packs?.monthly?.map(pack => {
                  if (selectPlan === pack.title) {
                    return (
                      <Box key={pack.title} sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                        <Sup>{pack.unit}</Sup>
                        <Typography
                          variant='h3'
                          sx={{
                            mb: -1.2,
                            lineHeight: 1,
                            color: 'primary.main',
                            fontSize: '3rem !important',
                            ml: 8
                          }}
                        >
                          {pack.price}
                        </Typography>
                        <Sub>/ {pack.plan}</Sub>
                      </Box>
                    )
                  }
                })}
            <Button color='primary' variant='outlined' sx={{ mt: 2 }} onClick={() => handlePage('/pricing')}>
              More Details
            </Button>
            <Button color='error' variant='outlined' sx={{ mt: 2 }} onClick={handleUpgradePlansClose}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default Currentplan
