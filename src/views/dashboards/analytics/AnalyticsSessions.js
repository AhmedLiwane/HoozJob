// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useState } from 'react'
import { useEffect } from 'react'

const AnalyticsSessions = ({ stats, percentage, title, last31days }) => {
  // ** Hook
  const theme = useTheme()

  const [series, setSeries] = useState([
    {
      name: 'Applicants',
      data: []
    }
  ])

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: {
      enabled: true
    },
    grid: {
      strokeDashArray: 6,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -15,
        left: -7,
        right: 7,
        bottom: -15
      }
    },
    stroke: { width: 3 },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 6,
      offsetY: 2,
      offsetX: -1,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 6,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper

          // dataPointIndex: series[0].data.length - 1
        }
      ],
      hover: { size: 7 }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  useEffect(() => {
    const tab2 = []
    last31days?.map(date => {
      // tab.push(date.date)
      tab2.push(date.nb)
    })
    setSeries([
      {
        name: 'Applicants',
        data: tab2
      }
    ])
  }, [last31days])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h7' sx={{ mr: 1.5, mb: 3 }}>
            {stats}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
            {percentage}
          </Typography>
        </Box>
        <Typography variant='body2'>{title}</Typography>
        <ReactApexcharts type='line' height={108} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsSessions
