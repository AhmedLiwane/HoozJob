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

const AnalyticsOverview = ({ title, percentage }) => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: -12
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  return (
    <Card sx={{ mr: 6 }}>
      <CardContent sx={{ '& .apexcharts-canvas .apexcharts-text': { fontWeight: 600, fontSize: '1rem' } }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: '1rem' }}>
          <Typography sx={{ mr: 1.5, fontSize: '0.9rem' }}>{title}</Typography>
        </Box>
        <ReactApexcharts type='radialBar' height={119} series={[percentage]} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsOverview
