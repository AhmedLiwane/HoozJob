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

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const ApexBarChart = ({ title, subheader, stats, status }) => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [cin, setCin] = useState(0)
  const [driver, setDriver] = useState(0)
  const [passport, setPassport] = useState(0)
  const [cinPer, setCinPer] = useState(0)
  const [driverPer, setDriverPer] = useState(0)
  const [passportPer, setPassportPer] = useState(0)
  const [total, setTotal] = useState(0)
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
          show: false
        }
      },
      padding: {
        top: -10
      }
    },
    colors: ['#33b2df'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['ID Card', 'Driver License', 'Passport']
    },
    yaxis: {
      show: true,
      min: 0,
      max: 50
    }
  }

  const series = [
    {
      name: 'Total',
      data: [cin ? cin : 0, driver ? driver : 0, passport ? passport : 0]
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
  useEffect(() => {
    filter()
  }, [cinPer, driverPer, passportPer, cin, passport, driver, total])

  const filter = () => {
    if (status === 1) {
      setCin(stats?.accepted.filter(t => t === 'ID_CARD').length)
      setDriver(stats?.accepted.filter(t => t === 'DRIVER').length)
      setPassport(stats?.accepted.filter(t => t === 'PASSPORT').length)
    } else if (status === 2) {
      setCin(stats?.created.filter(t => t === 'ID_CARD').length)
      setDriver(stats?.created.filter(t => t === 'DRIVER').length)
      setPassport(stats?.created.filter(t => t === 'PASSPORT').length)
    } else if (status === 3) {
      setCin(stats?.pending.filter(t => t === 'ID_CARD').length)
      setDriver(stats?.pending.filter(t => t === 'DRIVER').length)
      setPassport(stats?.pending.filter(t => t === 'PASSPORT').length)
      setTotal(cin + driver + passport)
    } else if (status === 4) {
      setCin(stats?.manuel.filter(t => t === 'ID_CARD').length)
      setDriver(stats?.manuel.filter(t => t === 'DRIVER').length)
      setPassport(stats?.manuel.filter(t => t === 'PASSPORT').length)
    } else if (status === 5) {
      setCin(stats?.refused.filter(t => t === 'ID_CARD').length)
      setDriver(stats?.refused.filter(t => t === 'DRIVER').length)
      setPassport(stats?.refused.filter(t => t === 'PASSPORT').length)
    }
    setTotal(cin + driver + passport)
    setCinPer(Math.round((cin / (total ? total : 1)) * 100))
    setDriverPer(Math.round((driver / (total ? total : 1)) * 100))
    setPassportPer(Math.round((passport / (total ? total : 1)) * 100))
  }
  return (
    <Card>
      <Grid container spacing={3}>
        <StyledGrid item sx={12} sm={8}>
          <CardHeader
            title={title}
            subheader={subheader}
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
        <Grid item xs={12} sm={4}>
          <CardContent>
            <StatusPerDocsPer
              title='Document types %'
              subheader='Accepted applicants based on the document type in percentage'
              cinPer={cinPer}
              driverPer={driverPer}
              passportPer={passportPer}
            />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ApexBarChart
