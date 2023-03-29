import { React, useEffect } from 'react'

// ** MUI Imports
import { Card } from '@mui/material'
import Grid from '@mui/material/Grid'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Components
import CardGeneralStatistics from 'src/views/overview/CardGeneralStatistics'
import Currentplan from 'src/views/overview/CurrentPlan'
import BillingAddress from 'src/views/overview/BillingAddress'
import BillingChart from 'src/views/overview/BillingChart'
import BillingChartBar from 'src/views/overview/BillingCandleChart'
import BillingHeader from 'src/views/overview/BillingHeader'

// ** Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getBilling } from 'src/redux/Company/action'

const Overview = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBilling())
  }, [])

  const CompanyState = useSelector(state => state.CompanyReducer)

  // ** Hooks
  return (
    <Card sx={{ p: 6 }}>
      <Grid container spacing={4} className='match-height'>
        <Grid Item xs={12}>
          <BillingHeader CompanyState={CompanyState} />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <CardGeneralStatistics CompanyState={CompanyState} />
        </Grid>
        <Grid item xs={12} md={6.5}>
          <Currentplan CompanyState={CompanyState} />
        </Grid>
        <Grid item xs={12} sm={7}>
          <BillingChart CompanyState={CompanyState} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <BillingAddress CompanyState={CompanyState} />
        </Grid>
        {/* <Grid item xs={12}>
          <BillingChartBar CompanyState={CompanyState} />
        </Grid> */}
      </Grid>
      <Backdrop
        open={CompanyState.load}
        sx={{
          position: 'absolute',
          color: theme => theme.palette.common.white,
          zIndex: theme => theme.zIndex.mobileStepper - 1
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Card>
  )
}

export default Overview
