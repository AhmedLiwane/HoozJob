// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [
  {
    name: ['Series 1'],
    data: [45, 52, 38, 24, 33]
  }
]

const AnalyticsSalesCountry = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '60%',
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
      hexToRGBA(theme.palette.success.light, 1),
      hexToRGBA(theme.palette.info.light, 1),
      hexToRGBA(theme.palette.warning.light, 1),
      hexToRGBA(theme.palette.primary.light, 1),
      hexToRGBA(theme.palette.error.light, 1)
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
      tooltip: {
        enabled: true
      },
      axisTicks: { show: false },
      axisBorder: { show: true },
      categories: ['Accepted', 'Created', 'Pending', 'Manuel', 'Refused']
    },
    yaxis: {
      labels: { align: theme.direction === 'rtl' ? 'right' : 'left' }
    }

    // x: { show: true }
  }

  return (
    <Card>
      <CardHeader
        title='Documents status'
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}

        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options'>
        //     <DotsVertical />
        //   </IconButton>
        // }
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
          },
          ml: 4
        }}
      >
        <ReactApexcharts type='bar' height={332} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsSalesCountry
