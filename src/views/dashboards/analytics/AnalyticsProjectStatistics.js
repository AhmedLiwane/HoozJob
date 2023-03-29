import { useEffect, useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import AccountCheck from 'mdi-material-ui/AccountCheck'
import AccountRemove from 'mdi-material-ui/AccountRemove'
import AccountSync from 'mdi-material-ui/AccountSync'
import AccountPlus from 'mdi-material-ui/AccountPlus'
import AccountCog from 'mdi-material-ui/AccountCog'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import moment from 'moment'

const AnalyticsProjectStatistics = ({ status }) => {
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [accepted, setAccepted] = useState(0)
  const [refused, setRefused] = useState(0)
  const [pending, setPending] = useState(0)
  const [manuel, setManuel] = useState(0)
  const [created, setCreated] = useState(0)

  useEffect(() => {
    // ** Filter
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    if (startDate === null && endDate === null) {
      setPending(status?.pending?.length)
      setCreated(status?.created?.length)
      setRefused(status?.refused?.length)
      setManuel(status?.manuel?.length)
      setAccepted(status?.accepted?.length)
    } else {
      //pending
      setPending(
        status?.pending.filter(t => {
          const date = moment(t).format('MM-DD-YYYY')

          return date === start || date === end || moment(date).isBetween(start, end)
        }).length
      )

      //created
      setCreated(
        status?.created.filter(t => {
          const date = moment(t).format('MM-DD-YYYY')

          return date === start || date === end || moment(date).isBetween(start, end)
        }).length
      )

      // refused
      setRefused(
        status?.refused.filter(t => {
          const date = moment(t).format('MM-DD-YYYY')

          return date === start || date === end || moment(date).isBetween(start, end)
        }).length
      )

      //manuel
      setManuel(
        status?.manuel.filter(t => {
          const date = moment(t).format('MM-DD-YYYY')

          return date === start || date === end || moment(date).isBetween(start, end)
        }).length
      )

      //accepted
      setAccepted(
        status?.accepted.filter(t => {
          const date = moment(t).format('MM-DD-YYYY')

          return date === start || date === end || moment(date).isBetween(start, end)
        }).length
      )
    }
  }, [startDate, endDate, status])

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
    <>
      <CardHeader
        title='Status Statistics'
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
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              lineHeight: 2,
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.17px',
              textTransform: 'uppercase'
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              lineHeight: 2,
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.17px',
              textTransform: 'uppercase'
            }}
          >
            Number
          </Typography>
        </Box>
        {/* BOX 1 */}
        <StatusBox title='Accepted' avatar={<AccountCheck />} label={accepted} />
        <StatusBox title='Created' avatar={<AccountPlus />} label={created} />
        <StatusBox title='Pending' avatar={<AccountSync />} label={pending} />
        <StatusBox title='Manuel' avatar={<AccountCog />} label={manuel} />
        <StatusBox title='Refused' avatar={<AccountRemove />} label={refused} />
      </CardContent>
    </>
  )
}

export default AnalyticsProjectStatistics

const StatusBox = ({ title, avatar, label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4
      }}
    >
      <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
        {avatar}
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
          {/* <Typography variant='caption'>'Vue + Laravel</Typography> */}
        </Box>
        <CustomChip
          skin='light'
          size='small'
          color='primary'
          label={label}
          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
        />
      </Box>
    </Box>
  )
}
