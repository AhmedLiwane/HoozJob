import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import TextField from '@mui/material/TextField'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Icons Import
import GenderFemale from 'mdi-material-ui/GenderFemale'
import GenderMale from 'mdi-material-ui/GenderMale'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import moment from 'moment'
const donutColors = {
  series1: '#00d4bd',
  series2: '#ffa1a1',
  series3: 'Gray',
  series4: '#8790A1'
}

const ApexDonutChart = ({ title, gender, subTitle, all }) => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [male, setMale] = useState('')
  const [malePc, setMalePc] = useState(0)
  const [female, setFemale] = useState('')
  const [femalePc, setFemalePc] = useState(0)
  const [notSelected, setNotSelected] = useState('')
  const [notSelectedPc, setNotSelectedPc] = useState(0)

  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size='small' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: { width: 0 },
    labels: malePc || femalePc || notSelectedPc ? ['Male', 'Female', 'Not Selected', ''] : ['', '', 'Empty', ''],
    colors:
      malePc || femalePc || notSelectedPc
        ? [donutColors.series1, donutColors.series2, donutColors.series4, '']
        : ['', donutColors.series3, ''],
    dataLabels: {
      enabled: malePc || femalePc || notSelectedPc ? true : false,
      formatter(val) {
        return `${parseInt(val, 10)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val, 10)}%`
              }
            },
            total: {
              show: false,
              fontSize: '1.5rem',
              label: 'Female',
              formatter() {
                return `${femalePc || 0}%`
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
  const filter = () => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    if (startDate === null && endDate === null) {
      const f = gender?.females?.length
      const m = gender?.males?.length
      const n = gender?.notSelected?.length
      setFemale(f)
      setFemalePc(Math.round((f / all) * 100))
      setMale(m)
      setMalePc(Math.round((m / all) * 100))
      setNotSelected(n)
      setNotSelectedPc(Math.round((n / all) * 100))
    } else {
      const f = gender?.females?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      const m = gender?.females?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      const n = gender?.notSelected?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      setFemale(f)
      setFemalePc(Math.round((f / all) * 100))
      setMale(m)
      setMalePc(Math.round((m / all) * 100))
      setNotSelected(n)
      setNotSelectedPc(Math.round((n / all) * 100))
    }
  }
  useEffect(() => {
    filter()
  }, [startDate, endDate, female, male, gender])

  const series = malePc || femalePc || notSelectedPc ? [malePc, femalePc, notSelectedPc, 0] : [0, 0, 0, 100]

  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={subTitle}
        subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
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
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-label, & .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-value':
            { fontSize: '1.2rem' }
        }}
      >
        <ReactApexcharts options={options} series={series} type='donut' height={300} />{' '}
        <Divider sx={{ mt: 2, mb: 5 }} />
        {/* Section 2 */}
        <IconBox title='Female' label={female} icon={<GenderFemale />} />
        <IconBox title='Male' label={male} icon={<GenderMale />} />
      </CardContent>
    </Card>
  )
}

const IconBox = ({ title, label, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4
      }}
    >
      <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
        {icon}
      </Avatar>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
        </Box>
        <CustomChip
          skin='light'
          size='small'
          color='primary'
          label={label || 0}
          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
        />
      </Box>
    </Box>
  )
}
export default ApexDonutChart
