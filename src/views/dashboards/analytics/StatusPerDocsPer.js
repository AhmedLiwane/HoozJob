// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const donutColors = {
  series1: '#fdd835',
  series2: '#00d4bd',
  series3: '#826bf8',
  series4: '#868796'
}

const ApexDonutChart = ({ title, subheader, cinPer, driverPer, passportPer }) => {
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: { width: 0 },
    labels:
      cinPer === 0 && driverPer === 0 && passportPer === 0
        ? ['Not selected']
        : ['ID Card', 'Driver License', 'Passport'],
    colors:
      cinPer === 0 && driverPer === 0 && passportPer === 0
        ? [donutColors.series4]
        : [donutColors.series1, donutColors.series2, donutColors.series3],
    dataLabels: {
      enabled: true,
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

  const series = cinPer === 0 && driverPer === 0 && passportPer === 0 ? [100] : [cinPer, driverPer, passportPer]

  return (
    <>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={subheader}
        subheaderTypographyProps={{ variant: 'caption', sx: { color: 'text.disabled' } }}
      />
      <CardContent
        sx={{
          '& .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-label, & .apexcharts-canvas .apexcharts-pie .apexcharts-datalabel-value':
            { fontSize: '1.2rem' }
        }}
      >
        <ReactApexcharts options={options} series={series} type='donut' height={400} />
      </CardContent>
    </>
  )
}

export default ApexDonutChart
