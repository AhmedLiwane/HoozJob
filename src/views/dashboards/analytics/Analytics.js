import { Divider, Grid } from '@mui/material'
import { React, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ApexBarChart from 'src/views/charts/apex-charts/ApexBarChart'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import AccountCheck from 'mdi-material-ui/AccountCheck'
import AccountRemove from 'mdi-material-ui/AccountRemove'
import AccountSync from 'mdi-material-ui/AccountSync'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import AccountCog from 'mdi-material-ui/AccountCog'
import Account from 'mdi-material-ui/Account'

// ** Components Imports
import DeviceType from '../statics/DeviceType'
import ISP from '../statics/ISP'
import NavigatorType from '../statics/NavigatorType'
import VerificationType from '../statics/VerifType'
import StatusChart from './StatusChart'
import RegionStats from './RegionStats'
import OS from './OS'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

const Analytics = ({ StatState }) => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} className='match-height'>
        <Box sx={{ width: '100%', mt: 10 }}>
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue)
              }}
            >
              <BottomNavigationAction label='All' icon={<Account />} />
              <BottomNavigationAction label='Accepted' icon={<AccountCheck />} />
              <BottomNavigationAction label='Created' icon={<AccountPlus />} />
              <BottomNavigationAction label='Pending' icon={<AccountSync />} />
              <BottomNavigationAction label='Maunel' icon={<AccountCog />} />
              <BottomNavigationAction label='Refused' icon={<AccountRemove />} />
            </BottomNavigation>
          </Box>
          {/* ALL */}
          <TabPanel value={value} index={0}>
            <Grid container spacing={6} className='match-height' sx={{ pt: 5, pl: 5 }}>
              <Grid item xs={12} md={12}>
                <StatusChart
                  title='Document Types and Status'
                  stats={StatState?.statusPerDoc}
                  subheader='Status based on the document type'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* DEVICE TYPE */}
                <DeviceType
                  title='Device Type'
                  subtitle1='Phone'
                  subtitle2='Computer'
                  subheader='Device used by the applicant'
                  stats={StatState.devices}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <VerificationType
                  title='Verification Method'
                  subheader='Applicants verification method'
                  verifEmail={StatState?.emails}
                  verifPhone={StatState?.phone}
                />
              </Grid>
              {/* <NAVIGATOR TYPE /> */}
              <Grid item xs={12} md={4}>
                <NavigatorType
                  title='Navigator Type'
                  subheader='Navigators used by applicants'
                  browser={StatState.browsers}
                />
              </Grid>
              {/* INTERNET SERVICE PROVIDER */}
              <Grid item xs={12} md={5}>
                <ISP title='Internet Service Provider' subheader='' isp={StatState?.isp} />
              </Grid>
              {/* <Locations /> */}
              <Grid item xs={12} md={4}>
                <RegionStats
                  title='Regions List'
                  subheader='Number of applicants in every region'
                  regions={StatState?.cities}
                />
                {/* <Verification Method /> */}
              </Grid>
              {/* OPERATING SYSTEM */}
              <Grid item xs={12} md={3}>
                <OS title='Operating System' os={StatState?.os} />
              </Grid>
            </Grid>
          </TabPanel>

          {/* ACCEPTED */}
          <TabPanelBox
            value={value}
            index={1}
            title={'Document Type'}
            stats={StatState?.statusPerDoc}
            status={value}
            all={StatState?.all}
            subheader={'Accepted applicants based to the document type'}
          />
          {/* CREATED */}
          <TabPanelBox
            value={value}
            subheader={'Created applicants based to the document type'}
            index={2}
            title={'Document Type'}
            stats={StatState?.statusPerDoc}
            status={value}
            all={StatState?.all}
          />
          {/* PENDING */}
          <TabPanelBox
            value={value}
            subheader={'Pending applicants based to the document type'}
            index={3}
            title={'Document Type'}
            stats={StatState?.statusPerDoc}
            status={value}
            all={StatState?.all}
          />
          {/* Manuel */}
          <TabPanelBox
            value={value}
            subheader={'Manuel applicants based to the document type'}
            index={4}
            title={'Document Type'}
            stats={StatState?.statusPerDoc}
            status={value}
            all={StatState?.all}
          />
          {/* Refused */}
          <TabPanelBox
            value={value}
            subheader={'Refused applicants based to the document type'}
            index={5}
            title={'Document Type'}
            stats={StatState?.statusPerDoc}
            status={value}
          />
        </Box>
      </Grid>
    </ApexChartWrapper>
  )
}

const TabPanelBox = ({ value, index, title, stats, status, subheader }) => {
  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={6} className='match-height' sx={{ pt: 5, pl: 5 }}>
        <Grid item xs={12} md={12}>
          <ApexBarChart title={title} subheader={subheader} stats={stats} status={status} />
        </Grid>
      </Grid>
    </TabPanel>
  )
}

export default Analytics
