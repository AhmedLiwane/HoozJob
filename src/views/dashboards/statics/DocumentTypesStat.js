import { forwardRef, useState, useRef, useEffect, React } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Avatar } from '@mui/material'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import AnalyticsOverview from 'src/views/dashboards/analytics/AnalyticsOverview'

// ** Icons Imports
import Car from 'mdi-material-ui/Car'
import Passport from 'mdi-material-ui/Passport'
import CardAccountDetailsOutline from 'mdi-material-ui/CardAccountDetailsOutline'

import moment from 'moment'

const DocumentTypesStat = ({ docs, title, subtitle }) => {
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [cin, setCin] = useState(0)
  const [cinPc, setCinPc] = useState(0)
  const [driver, setDriver] = useState(0)
  const [driverPc, setDriverPc] = useState(0)
  const [passport, setPassport] = useState(0)
  const [passportPc, setPassportPc] = useState(0)

  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size='smtotal' inputRef={ref} label={props.label || ''} {...props} value={value} />
  })
  useEffect(() => {
    filter()
  }, [startDate, endDate, docs])
  const filter = () => {
    const start = moment(startDate).format('MM-DD-YYYY')
    const end = moment(endDate).format('MM-DD-YYYY')
    // CIN
    if (startDate === null && endDate === null) {
      const cin = docs?.cin?.length
      const driver = docs?.driver?.length
      const passport = docs?.passport?.length
      const total = cin + driver + passport
      setPassport(passport), setPassportPc(Math.round((passport / total) * 100))
      setCin(cin), setCinPc(Math.round((cin / total) * 100))
      setDriver(driver), setDriverPc(Math.round((driver / total) * 100))
    } else {
      const cin = docs?.cin?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      // Driver
      const driver = docs?.driver?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      // Passport
      const passport = docs?.passport?.filter(t => {
        const date = moment(t).format('MM-DD-YYYY')
        return date === start || date === end || moment(date).isBetween(start, end)
      }).length
      const total = cin + driver + passport
      setPassport(passport), setPassportPc(Math.round((passport / total) * 100))
      setDriver(driver), setDriverPc(Math.round((driver / total) * 100))
      setCin(cin), setCinPc(Math.round((cin / total) * 100))
    }
  }

  const handleDate = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <Card>
      {/* Section 2 */}
      {/* <Grid item xs={12} sm={5}> */}
      <CardHeader
        title={title}
        subheader={subtitle}
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
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
      <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
        <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 12, sm: 4, md: 12 }}>
          <Grid item xs={12} sm={12} md={4}>
            <AnalyticsOverview title={'ID Card'} percentage={!cinPc ? 0 : cinPc} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AnalyticsOverview title={'Driver License'} percentage={!driverPc ? 0 : driverPc} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AnalyticsOverview title={'Passport'} percentage={!passportPc ? 0 : passportPc} />
          </Grid>
        </Grid>
      </CardContent>
      <Grid>
        <Box sx={{ mr: 10, ml: 6, mb: 3, pt: 6, pl: 6, pr: 5 }}>
          <IconBox title='ID Card' icon={<CardAccountDetailsOutline />} stat={cin} />
          <IconBox title='Driver License' icon={<Car />} stat={driver} />
          <IconBox title='Passport' icon={<Passport />} stat={passport} />
        </Box>
      </Grid>
      {/* </Grid> */}
    </Card>
  )
}

const IconBox = ({ title, icon, stat }) => {
  return (
    <>
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
            size='smtotal'
            color='primary'
            label={stat}
            sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
          />
        </Box>
      </Box>
    </>
  )
}

export default DocumentTypesStat
