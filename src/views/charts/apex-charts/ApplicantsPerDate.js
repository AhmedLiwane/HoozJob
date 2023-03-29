// ** React Imports
import { forwardRef, useState, useRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import TrendingDown from 'mdi-material-ui/TrendingDown'
import Account from 'mdi-material-ui/Account'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

/********/
import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import FilterVariant from 'mdi-material-ui/FilterVariant'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { Avatar, TextField } from '@mui/material'
// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const areaColors = {
  series1: '#ab7efd'
}

const ApexAreaChart = ({ titleOne, subtitleOne, applicantsNumber, rate, stats }) => {
  // ** States
  var start = new Date()
  var ts = start.getTime()
  var twelveDays = ts - 7 * 24 * 60 * 60 * 1000
  start.setUTCDate(twelveDays)
  const end = moment(twelveDays).format('MM-DD-YYYY')
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date(end))
  const [dates, setDates] = useState([])

  function getDates() {
    var dateArray = []
    var currentDate = moment(startDate)
    var stopDate = moment(endDate)
    if (endDate === null) {
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
      return setDates(dateArray)
    } else {
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
      return setDates(dateArray)
    }
  }

  var timeFrom = () => {
    // var dates = []
    // for (let I = 0; I < Math.abs(7); I++) {
    //   const test = new Date(startDate.getTime() - (7 >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000).toLocaleString()
    //   dates.push(moment(test).format('MM-DD'))
    // }
    // return setDates(dates)
  }

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: [areaColors.series1],
    xaxis: {
      // categories: dates
      // min: new Date(endDate),
      // max: new Date(startDate)
      // min: new Date('27 Feb 2012').getTime(),
      // max: new Date('27 Feb 2013').getTime()
      categories: dates
      // categories: [
      //   '7/12',
      //   '8/12',
      //   '9/12',
      //   '10/12',
      //   '11/12',
      //   '12/12',
      //   '13/12',
      //   '14/12',
      //   '15/12',
      //   '16/12',
      //   '17/12',
      //   '18/12',
      //   '19/12'
      // ]
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      shared: false
    }
  }

  const series = [
    {
      name: 'Visits',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
    }
  ]

  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size='small' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  useEffect(() => {
    timeFrom()
    getDates()
  }, [applicantsNumber, rate, startDate, endDate])

  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12} sm={8}>
          {/* Section 1 */}
          <CardHeader
            title='Line Chart'
            subheader='Commercial networks'
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': { mb: 0 },
              '& .MuiCardHeader-content': { mb: [2, 0] }
            }}
            action={
              <DatePickerWrapper>
                <DatePicker
                  style={{ width: '50px' }}
                  selectsRange
                  isClearable
                  endDate={endDate}
                  selected={startDate}
                  startDate={startDate}
                  onChange={handleDate}
                  shouldCloseOnSelect={false}
                  customInput={<CustomInput label='Date Range' start={startDate} end={endDate} />}
                />
              </DatePickerWrapper>
            }
          />
          <CardContent>
            <ReactApexcharts options={options} series={series} type='area' height={400} />
          </CardContent>
        </StyledGrid>
        <SectionTwo
          title='Total Applicants'
          subtitle1='Increase rate this month'
          subtitle2='Increase rate this month'
          applicantsNumber={applicantsNumber}
          rate={rate}
        />
      </Grid>
    </Card>
  )
}

export const SectionTwo = ({ title, subtitle1, subtitle2, applicantsNumber, rate }) => {
  return (
    <Grid item xs={12} md={4}>
      <CardHeader
        title='Total Applicants'
        subheader=''
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(10)} !important` }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Avatar variant='rounded' sx={{ mb: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
              <Account />
            </Avatar>
            <Typography sx={{ mb: 0.5 }} variant='body2'>
              {title}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{applicantsNumber}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 10, mb: 7.5 }} />
        {rate > 0 ? (
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <CustomAvatar skin='light' sx={{ mb: 3 }} color='success' variant='rounded'>
              <TrendingUp />
            </CustomAvatar>
            <Typography sx={{ mb: 0.5 }} variant='body2'>
              {subtitle1}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{rate}%</Typography>
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
          >
            <CustomAvatar skin='light' sx={{ mb: 3 }} variant='rounded' color='error'>
              <TrendingDown />
            </CustomAvatar>
            <Typography sx={{ mb: 0.5 }} variant='body2'>
              {subtitle2}
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{rate}%</Typography>
          </Grid>
        )}
      </CardContent>
    </Grid>
  )
}

export default ApexAreaChart
