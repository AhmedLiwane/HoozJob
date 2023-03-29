// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import moment from 'moment'

const columnColors = {
  series1: '#00d4bd',
  series2: '#ffa1a1',
  series3: '#8790A1'
}

const ApexColumnChartAge = ({ ageGender, title }) => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [male, setMale] = useState([])
  const [female, setFemale] = useState([])
  const [notSelected, setNotSelected] = useState([])
  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`
    return <TextField size='small' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

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
        columnWidth: '20%',
        colors: {
          backgroundBarRadius: 10
        }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
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
      categories: ['18/20', '20/25', '25/30', '30/35', '35/40', '45/50', '55/60']
    },
    fill: {
      opacity: 1
    }
  }

  const filter = async () => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    // NotSelected

    setNotSelected(
      ageGender?.nsAges?.map(
        age =>
          age.filter(i => {
            if (i.creationDate) {
              const date = moment(i.creationDate.toString()).format('MM-DD-YYYY')
              if (endDate === null && startDate === null) {
                return date
              } else {
                return date === start || date === end || moment(date).isBetween(start, end)
              }
            }
          }).length
      )
    )
    // MALE
    setMale(
      ageGender?.maleAges?.map(
        age =>
          age.filter(i => {
            if (i.creationDate) {
              const date = moment(i.creationDate.toString()).format('MM-DD-YYYY')
              if (endDate === null && startDate === null) {
                return date
              } else {
                return date === start || date === end || moment(date).isBetween(start, end)
              }
            }
          }).length
      )
    )
    // FEMALE
    setFemale(
      ageGender?.femaleAges?.map(
        age =>
          age.filter(i => {
            if (i.creationDate) {
              const date = moment(i.creationDate.toString()).format('MM-DD-YYYY')
              if (endDate === null && startDate === null) {
                return date
              } else {
                return date === start || date === end || moment(date).isBetween(start, end)
              }
            }
          }).length
      )
    )
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate, ageGender])

  const series = [
    {
      name: 'Male',
      data: male ? male : [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Female',
      data: female ? female : [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Not Selected',
      data: notSelected ? notSelected : [0, 0, 0, 0, 0, 0, 0]
    }
  ]
  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const now = new Date()

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)

  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
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
        <ReactApexcharts options={options} series={series} type='bar' height={400} />
      </CardContent>
    </Card>
  )
}

export default ApexColumnChartAge
