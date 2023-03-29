import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Demo Components Imports
import TopCards from 'src/views/dashboard/applicantsCards/TopCards'

// ** Context
import { useDispatch } from 'react-redux'
import { getNumbers } from 'src/redux/Statistics/action'

const Dashboard = () => {
  const dispatch = useDispatch()

  const [numbers, setNumbers] = useState({
    all: 0,
    transactions: 0,
    pending: 0,
    pro: 0,
    normal: 0
  })

  useEffect(() => {
    dispatch(getNumbers()).then(res => {
      if (res.data.code === 200) {
        setNumbers(res.data.data)
      }
    })
  }, [])

  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h5'>Overview</Typography>} />
      <Grid item xs={6}>
        <CardStatisticsVertical stat={numbers} title='Total transactions' />
      </Grid>
      <Grid item xs={6}>
        <CardStatisticsVertical stat={numbers} title='Total users' />
      </Grid>
      <Grid item xs={12} sx={{ mb: 5 }}>
        <TopCards stat={numbers} />
      </Grid>
    </Grid>
  )
}

export default Dashboard
