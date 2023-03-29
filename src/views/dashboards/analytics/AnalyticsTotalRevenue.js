// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import GenderMaleFemale from 'mdi-material-ui/GenderMaleFemale'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Icons Imports
import GenderFemale from 'mdi-material-ui/GenderFemale'
import GenderMale from 'mdi-material-ui/GenderMale'

const AnalyticsTotalRevenue = ({ color, gender }) => {
  // ** Hook
  const theme = useTheme()

  const series = [
    {
      name: 'Male',
      data: [gender?.males]
    },
    {
      name: 'Female',
      data: [gender?.females]
    }
  ]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      padding: {
        top: -15,
        left: -14,
        right: -4,
        bottom: -15
      },
      yaxis: {
        lines: { show: true }
      }
    },
    legend: { show: true },
    dataLabels: { enabled: false },
    colors: [hexToRGBA(theme.palette.primary.main, 1), hexToRGBA(theme.palette.warning.main, 1)],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
        startingShape: 'rounded'
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr']
    },
    yaxis: {
      labels: { show: true }
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' color={color} sx={{ m: 2 }}>
            <GenderMaleFemale />
          </CustomAvatar>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            Gender
          </Typography>
        </Box>
        <ReactApexcharts type='bar' height={108} options={options} series={series} />
        <Divider sx={{ mt: 12, mb: 6 }} />
        {/* SECTION 2 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
            <GenderFemale />
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
                Female
              </Typography>
            </Box>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={gender?.females}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            />
          </Box>
        </Box>
        {/*  */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
            <GenderMale />
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
                Male
              </Typography>
            </Box>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={gender?.males}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AnalyticsTotalRevenue
