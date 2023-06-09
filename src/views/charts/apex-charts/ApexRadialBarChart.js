// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const radialBarColors = {
  series1: '#fdd835',
  series2: '#40CDFA',
  series3: '#00d4bd',
  series4: '#7367f0',
  series5: '#FFA1A1'
}

const ApexRadialBarChart = () => {
  const options = {
    colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '30%'
        },
        track: {
          margin: 15
        },
        dataLabels: {
          name: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          total: {
            show: false,
            label: 'Documents',
            fontSize: '1.125rem'
            // formatter: function (w) {
            //   const totalValue =
            //     w.globals.seriesTotals.reduce((a, b) => {
            //       return a + b
            //     }, 0) / w.globals.series.length
            //   if (totalValue % 1 === 0) {
            //     return totalValue + '%'
            //   } else {
            //     return totalValue.toFixed(2) + '%'
            //   }
            // }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['ID Card', 'Driver License', 'Passport']
  }

  return (
    <>
      <CardContent>
        <ReactApexcharts options={options} series={[80, 50, 35]} type='radialBar' height={400} />
      </CardContent>
    </>
  )
}

export default ApexRadialBarChart
