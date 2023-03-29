import React from 'react'
import { Box, Card, Grid } from '@mui/material'
import GeneralInfo from './GeneralInfo'
import SecurityChecks from './SecurityChecks'
import SessionDevices from './SessionDevices'
import ActivityTimeline from './ActivityTimeline'

const OverviewTab = ({ load, session, data }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12}>
          <GeneralInfo data={data} load={load} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SecurityChecks data={data} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <SessionDevices session={session} />
        </Grid>
        <Grid item xs={12}>
          <ActivityTimeline session={session} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OverviewTab
