// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import { Divider, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import format from 'date-fns/format'
// import DatePicker from 'react-datepicker/dist/react-datepicker.css'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Component Import
// import ReactApexcharts from 'src/@core/components/react-apexcharts'
import StatusPerDocsPer from 'src/views/dashboards/analytics/StatusPerDocsPer'
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

const BillingAreaChart = ({ CompanyState }) => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [lastAm, setLastAm] = useState([])
  const [rest, setRest] = useState([])
  const [amount, setAmount] = useState([])
  const [dates, setDates] = useState([])

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '50%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
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
    colors: ['#7986cb', '#757de8', '#002984'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: dates
    },
    yaxis: {
      show: true,
      min: 0,
      max: 50
    }
  }

  const series = [
    {
      name: 'Last amount',
      data: lastAm ? lastAm : [0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Rest',
      data: rest ? rest : [0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Total',
      data: amount ? amount : [0, 0, 0, 0, 0, 0]
    }
  ]

  const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BellOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <ChevronDown />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const filter = () => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    setLastAm(
      CompanyState?.billing?.spendings?.map(spend => {
        if (!endDate) {
          return spend.lastAmount
        } else {
          const date = moment(spend.creationDate).format('MM-DD-YYYY')
          if (date === start || date === end || moment(date).isBetween(start, end)) {
            return spend.lastAmount
          }
        }
      })
    )
    setAmount(
      CompanyState?.billing?.spendings?.map(spend => {
        if (!endDate) {
          return spend.amount
        } else {
          const date = moment(spend.creationDate).format('MM-DD-YYYY')
          if (date === start || date === end || moment(date).isBetween(start, end)) {
            return spend.amount
          }
        }
      })
    )
    setRest(
      CompanyState?.billing?.spendings?.map(spend => {
        if (!endDate) {
          return spend.rest
        } else {
          const date = moment(spend.creationDate).format('MM-DD-YYYY')
          if (date === start || date === end || moment(date).isBetween(start, end)) {
            return spend.rest
          }
        }
      })
    )
    setDates(
      CompanyState?.billing?.spendings?.map(spend => {
        if (!endDate) {
          return spend.creationDate
        } else {
          const date = moment(spend.creationDate).format('MM-DD-YYYY')
          if (date === start || date === end || moment(date).isBetween(start, end)) {
            return spend.creationDate
          }
        }
      })
    )
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate, CompanyState])

  return (
    <Card>
      <Grid container spacing={3}>
        <StyledGrid item sx={12} sm={8}>
          <CardHeader
            title='Wallet Statistics'
            // subheader=''
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption' }}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': { mb: 0 },
              '& .MuiCardHeader-content': { mb: [2, 0] }
            }}
          />
          <CardContent>
            <ReactApexcharts options={options} series={series} type='bar' height={400} />
          </CardContent>
        </StyledGrid>
      </Grid>
    </Card>
  )
}

export default BillingAreaChart
