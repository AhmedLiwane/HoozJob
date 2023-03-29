import React from 'react'
import { Box, Card, Grid } from '@mui/material'
import GeneralInfo from './GeneralInfo'
import UserViewOverview from '../applicant/UserViewOverview'
import SecurityChecks from './SecurityChecks'
import ActivityTimeline from './ActivityTimeline'

const OverviewTab = () => {
  return (
    <Box sx={{ pl: 5, width: '100%' }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <GeneralInfo />
        </Grid>
        <Grid item xs={4}>
          <SecurityChecks />
        </Grid>
        <Grid item xs={8}>
          <ActivityTimeline />
        </Grid>
      </Grid>
    </Box>
  )
}

export default OverviewTab
