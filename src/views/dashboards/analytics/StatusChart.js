// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const columnColors = {
  series3: '#039be5',
  series1: '#00acc1',
  series2: '#b0bec5'
}

const ApexColumnChart = ({ title, stats, subheader }) => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(new Date())

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '15%'
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '15%'
            }
          }
        }
      }
    ],
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    colors: [columnColors.series1, columnColors.series2, columnColors.series3],
    stroke: {
      show: true,
      colors: ['transparent']
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: ['Created', 'Accepted', 'Pending', 'Manuel', 'Refused']
    },
    fill: {
      opacity: 1
    }
  }

  const series = [
    {
      name: 'ID Card',
      data: [
        stats.created.filter(t => t === 'ID_CARD').length,
        stats.accepted.filter(t => t === 'ID_CARD').length,
        stats.pending.filter(t => t === 'ID_CARD').length,
        stats.manuel.filter(t => t === 'ID_CARD').length,
        stats.refused.filter(t => t === 'ID_CARD').length
      ]
    },
    {
      name: 'Driver License',
      data: [
        stats.created.filter(t => t === 'DRIVER').length,
        stats.accepted.filter(t => t === 'DRIVER').length,
        stats.pending.filter(t => t === 'DRIVER').length,
        stats.manuel.filter(t => t === 'DRIVER').length,
        stats.refused.filter(t => t === 'DRIVER').length
      ]
    },
    {
      name: 'Passport',
      data: [
        stats.created.filter(t => t === 'PASSPORT').length,
        stats.accepted.filter(t => t === 'PASSPORT').length,
        stats.pending.filter(t => t === 'PASSPORT').length,
        stats.manuel.filter(t => t === 'PASSPORT').length,
        stats.refused.filter(t => t === 'PASSPORT').length
      ]
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

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        // action={
        //   <DatePicker
        //     selectsRange
        //     endDate={endDate}
        //     selected={startDate}
        //     id='apexchart-column'
        //     startDate={startDate}
        //     onChange={handleOnChange}
        //     placeholderText='Click to select a date'
        //     customInput={<CustomInput start={startDate} end={endDate} />}
        //   />
        // }
      />
      <CardContent>
        <ReactApexcharts options={options} series={series} type='bar' height={400} />
      </CardContent>
    </Card>
  )
}

export default ApexColumnChart
