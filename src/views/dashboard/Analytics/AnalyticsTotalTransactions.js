// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import Refresh from 'mdi-material-ui/Refresh'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import TrendingDown from 'mdi-material-ui/TrendingDown'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [
  {
    type: 'column',
    name: 'Accepted',
    data: [90, 52, 67, 45, 75, 55, 48]
  },
  {
    type: 'column',
    name: 'Refused',
    data: [-53, -29, -67, -84, -60, -40, -77]
  },
  {
    type: 'line',
    name: 'Total',
    data: [73, 20, 50, -20, 58, 15, 31]
  }
]

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const AnalyticsTotalTransactions = () => {
  // ** Hook
  const theme = useTheme()
  const [reload, setReload] = useState(false)

  const options = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '57%',
        endingShape: 'flat',
        startingShape: 'rounded'
      }
    },
    markers: {
      size: 4,
      strokeWidth: 3,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: [theme.palette.background.paper],
      strokeColors: hexToRGBA(theme.palette.warning.main, 1)
    },
    stroke: {
      curve: 'smooth',
      width: [0, 0, 3],
      colors: [hexToRGBA(theme.palette.warning.main, 1)]
    },
    colors: [hexToRGBA(theme.palette.primary.main, 1), hexToRGBA(theme.palette.primary.main, 0.12)],
    dataLabels: { enabled: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    legend: { show: false },
    grid: {
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -28,
        left: -6,
        right: -8,
        bottom: -5
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Sun', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    yaxis: {
      max: 100,
      min: -90,
      show: false
    }
  }

  const handleBackDrop = () => {
    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000)
  }

  return (
    <Card sx={{ position: 'relative' }}>
      <Grid container>
        <StyledGrid item xs={12} sm={7}>
          <CardHeader title='Total Sessions' titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }} />
          <CardContent
            sx={{
              '& .apexcharts-canvas .apexcharts-text': { fill: theme.palette.text.disabled },
              '& .apexcharts-series[rel="2"]': {
                transform: theme.direction === 'rtl' ? 'translateX(-5px)' : 'translateX(5px)'
              }
            }}
          >
            <ReactApexcharts type='line' height={278} series={series} options={options} />
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} sm={5}>
          <CardHeader
            title='Report'
            subheader='Last month sessions : 500'
            subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
            titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
            action={
              <IconButton
                size='small'
                aria-label='collapse'
                sx={{ color: 'text.secondary' }}
                onClick={() => handleBackDrop()}
              >
                <Refresh fontSize='small' />
              </IconButton>
            }
          />
          <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRight: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <CustomAvatar skin='light' sx={{ mb: 3 }} color='success' variant='rounded'>
                  <TrendingUp />
                </CustomAvatar>
                <Typography sx={{ mb: 0.5 }} variant='body2'>
                  This Week
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>+82.45%</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CustomAvatar skin='light' sx={{ mb: 3 }} variant='rounded'>
                  <TrendingDown />
                </CustomAvatar>
                <Typography sx={{ mb: 0.5 }} variant='body2'>
                  Last Week
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>-24.86%</Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 10, mb: 7.5 }} />
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography sx={{ mb: 0.5 }} variant='body2'>
                  Performance
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>+94.15%</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant='contained'>
                  See more
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Backdrop
            open={reload}
            sx={{
              position: 'absolute',
              color: theme => theme.palette.common.white,
              zIndex: theme => theme.zIndex.mobileStepper - 1
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AnalyticsTotalTransactions
