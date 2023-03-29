import React from 'react'

// ** MUI Imports
import { Card, Grid, styled } from '@mui/material'

// ** Components Imports
import AnalyticsProjectStatistics from '../analytics/AnalyticsProjectStatistics'
import ApexRadialBarChart from './ApexRadialChart'

const Status = ({ status, all }) => {
  return (
    <Card>
      <Grid container>
        <StyledGrid xs={12} sm={5}>
          <AnalyticsProjectStatistics status={status} />
        </StyledGrid>
        <Grid xs={12} sm={7}>
          <ApexRadialBarChart status={status} all={all} title='Applicants Status %' />
        </Grid>
      </Grid>
    </Card>
  )
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

export default Status
