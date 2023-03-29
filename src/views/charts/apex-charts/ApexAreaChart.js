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
import { Avatar } from '@mui/material'

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
  series1: '#ab7efd',
  series2: '#b992fe',
  series3: '#e0cffe'
}

const ApexAreaChart = ({ last7days, last31days, titleOne, subtitleOne, applicantsNumber, rate }) => {
  const filterOptions = ['Last 7 Days', 'Last 31 days']
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  // ** States
  const [endDate, setEndDate] = useState(null)
  const [sevenDays, setSevenDays] = useState([])
  const [monthDays, setMonthDays] = useState([])

  const [series, setSeries] = useState([
    {
      name: 'Applicants',
      data: []
    }
  ])
  const [startDate, setStartDate] = useState(new Date())

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
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    xaxis: {
      categories: selectedIndex === 0 ? sevenDays : monthDays,
      type: 'datetime'
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      shared: false
    }
  }

  useEffect(() => {
    let tab = []
    let tab2 = []
    if (selectedIndex === 0) {
      last7days?.map(date => {
        tab.push(date.date)
        tab2.push(date.nb)
      })
      setSeries([
        {
          name: 'Applicants',
          data: tab2
        }
      ])
      setSevenDays(tab)
    } else {
      last31days?.map(date => {
        tab.push(date.date)
        tab2.push(date.nb)
      })
      setSeries([
        {
          data: tab2
        }
      ])
      setMonthDays(tab)
    }
  }, [last7days, last31days, selectedIndex, applicantsNumber, rate])

  const handleOnChange = dates => {
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
            title={titleOne}
            subheader={subtitleOne}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': { mb: 0 },
              '& .MuiCardHeader-content': { mb: [2, 0] }
            }}
            action={
              <>
                <ButtonGroup variant='text' ref={anchorRef} aria-label='split button' color='secondary'>
                  <Button onClick={handleToggle} endIcon={<FilterVariant />}>
                    {filterOptions[selectedIndex]}
                  </Button>
                </ButtonGroup>
                <Popper
                  sx={{
                    zIndex: 1
                  }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList id='split-button-menu' autoFocusItem>
                            {filterOptions.map((option, index) => (
                              <MenuItem
                                key={option}
                                selected={index === selectedIndex}
                                onClick={event => handleMenuItemClick(event, index)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
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
