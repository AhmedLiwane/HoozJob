// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useState, forwardRef, useEffect } from 'react'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'

const BillingChart = ({ CompanyState }) => {
  // Dates
  var start = new Date()
  var ts = start.getTime()
  var twelveDays = ts - 7 * 24 * 60 * 60 * 1000
  start.setUTCDate(twelveDays)
  const end = moment(twelveDays).format('MM-DD-YYYY')
  // ** States
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date(end))
  const [dates, setDates] = useState([])
  const [lastAm, setLastAm] = useState(null)

  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: ['#ff9f43'],
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: -10
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      }
    },
    xaxis: {
      categories: dates
    }
  }

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
  useEffect(() => {
    getDates()
    filter()
  }, [startDate, endDate])

  const filter = () => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    //   if (CompanyState?.billing?.spendings?.length !== 0) {
    //     setLastAm(
    //       CompanyState?.billing?.spendings?.filter(spend => {
    //         if (!endDate) {
    //           return spend.lastAmount
    //         } else {
    //           const date = moment(spend.creationDate).format('MM-DD-YYYY')
    //           if (date === start || date === end || moment(date).isBetween(start, end)) {
    //             return spend.lastAmount
    //           }
    //         }
    //       })
    //     )
    //   } else setLastAm(0, 0, 0, 0, 0, 0)

    // setLastAm(
    //   CompanyState?.billing?.spendings?.map(s => {
    //     if (!endDate) {
    //       return s.lastAmount
    //     } else {
    //       const date = moment(s.creationDate).format('MM-DD-YYYY')
    //       if (date === start || date === end || moment(date).isBetween(start, end)) {
    //         return s.lastAmount
    //       }
    //     }
    //   })
    // )

    // THE ONE THAT WORKS WITH NO ERRORS
    setLastAm(
      CompanyState?.billing?.spendings?.map(s => {
        return s.lastAmount
      })
    )
  }

  const series = [
    {
      data: lastAm ? lastAm : [0, 0, 0, 0, 0, 0]
    }
  ]

  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size='small' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })
  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <Card>
      <CardHeader
        title='Last Amount'
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
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
        <ReactApexcharts options={options} series={series} type='line' height={400} />
      </CardContent>
    </Card>
  )
}

export default BillingChart
