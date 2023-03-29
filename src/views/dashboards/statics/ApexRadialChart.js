import { useEffect, useState, forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import moment from 'moment'
import { useSelector } from 'react-redux'

const radialBarColors = {
  series1: 'rgb(137,230,76)',
  series2: '#737E92',
  series3: '#FDD835',
  series4: '#FF5B57'
}

const ApexRadialBarChart = ({ title, all, status }) => {
  const StatState = useSelector(state => state.StatisticsReducer)

  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [accepted, setAccepted] = useState(0)
  const [refused, setRefused] = useState(0)
  const [pending, setPending] = useState(0)
  const [manuel, setManuel] = useState(0)
  const [created, setCreated] = useState(0)

  const options = {
    colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series3, radialBarColors.series4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%'
        },
        track: {
          margin: 15
        },
        dataLabels: {
          name: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          total: {
            show: false,
            label: 'Accepted',
            fontSize: '1.125rem',
            formatter: function (w) {
              const totalValue =
                w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0) / w.globals.series.length
              if (totalValue % 1 === 0) {
                return totalValue + '%'
              } else {
                return totalValue.toFixed(2) + '%'
              }
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Accepted', 'Pending', 'Manuel', 'Refused']
  }

  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size='small' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })

  useEffect(() => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')

    //pending
    if (startDate === null && endDate === null) {
      setPending(Math.round((status?.pending?.length / all) * 100))
    } else {
      setPending(
        Math.round(
          (status?.pending.filter(t => {
            const date = moment(t).format('MM-DD-YYYY')

            return date === start || date === end || moment(date).isBetween(start, end)
          }).length /
            all) *
            100
        )
      )
    }

    //created
    if (startDate === null && endDate === null) {
      setCreated(Math.round((status?.created?.length / all) * 100))
    } else {
      setCreated(
        Math.round(
          (status?.created.filter(t => {
            const date = moment(t).format('MM-DD-YYYY')

            return date === start || date === end || moment(date).isBetween(start, end)
          }).length /
            all) *
            100
        )
      )
    }

    // refused
    if (startDate === null && endDate === null) {
      setRefused(Math.round((status?.refused?.length / all) * 100))
    } else {
      setRefused(
        Math.round(
          (status?.refused.filter(t => {
            const date = moment(t).format('MM-DD-YYYY')

            return date === start || date === end || moment(date).isBetween(start, end)
          }).length /
            all) *
            100
        )
      )
    }

    //manuel
    if (startDate === null && endDate === null) {
      setManuel(Math.round((status?.manuel?.length / all) * 100))
    } else {
      setManuel(
        Math.round(
          (status?.manuel.filter(t => {
            const date = moment(t).format('MM-DD-YYYY')

            return date === start || date === end || moment(date).isBetween(start, end)
          }).length /
            all) *
            100
        )
      )
    }

    //accepted
    if (startDate === null && endDate === null) {
      setAccepted(Math.round((status?.accepted?.length / all) * 100))
    } else {
      setAccepted(
        Math.round(
          (status?.accepted.filter(t => {
            const date = moment(t).format('MM-DD-YYYY')

            return date === start || date === end || moment(date).isBetween(start, end)
          }).length /
            all) *
            100
        )
      )
    }
  }, [startDate, endDate, accepted, pending, refused, manuel, StatState])

  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ mb: 5 }}
        subheader={
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
      <CardContent sx={{ pt: 5 }}>
        <ReactApexcharts
          options={options}
          series={[!accepted ? 0 : accepted, !pending ? 0 : pending, !manuel ? 0 : manuel, !refused ? 0 : refused]}
          type='radialBar'
          height={400}
        />
      </CardContent>
    </>
  )
}

export default ApexRadialBarChart
