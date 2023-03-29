// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const ISP = ({ title, subheader, isp }) => {
  const theme = useTheme()

  const series = [
    {
      name: 'ISP',
      data: Object.values(isp)
    }
  ]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '50%',
        horizontal: true,
        distributed: true,
        startingShape: 'rounded'
      }
    },
    grid: {
      strokeDashArray: 8,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -18,
        left: 26,
        right: 50,
        bottom: 6
      }
    },
    colors: [
      hexToRGBA(theme.palette.primary.light, 1),
      hexToRGBA(theme.palette.success.light, 1),
      hexToRGBA(theme.palette.warning.light, 1),
      hexToRGBA(theme.palette.info.light, 1),
      hexToRGBA(theme.palette.error.light, 1),
      '#7e57c2',
      '#5c6bc0',
      '#009688'
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: Object.keys(isp).map(operator => {
        if (operator === 'undefined') {
          return 'Others'
        } else {
          return operator
        }
      })
      // categories: [
      //   'Tunisie-Telecom',
      //   'Ooredoo Tunisia',
      //   'Orange Tunisie',
      //   'GlobalNet',
      //   'Ste-internet-smart-solutions',
      //   'TOPNET',
      //   'Tunet',
      //   'Others'
      // ],
    },
    yaxis: {
      labels: { align: theme.direction === 'rtl' ? 'right' : 'left' }
    }
  }

  return (
    <Card>
      {' '}
      <CardHeader
        title={title}
        subheader={subheader}
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
      />
      <CardContent
        sx={{
          p: '0 !important',
          '& .apexcharts-canvas .apexcharts-yaxis-label': { fontSize: '0.875rem', fontWeight: 600 },
          '& .apexcharts-canvas .apexcharts-xaxis-label': { fontSize: '0.875rem', fill: theme.palette.text.disabled },
          '& .apexcharts-data-labels .apexcharts-datalabel': {
            fontWeight: 500,
            fontSize: '0.875rem',
            fill: theme.palette.common.white
          }
        }}
      >
        <ReactApexcharts type='bar' height={332} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default ISP
