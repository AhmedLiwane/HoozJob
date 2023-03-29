// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import ApexAreaChart from 'src/views/charts/apex-charts/ApexAreaChart'
import ApexColumnChartAge from 'src/views/charts/apex-charts/ApexColumnChartAge'
import ApexDonutChart from 'src/views/charts/apex-charts/ApexDonutChart'
import DocumentTypesStat from './DocumentTypesStat'
import Status from './Status'

const AnalyticsDashboard = ({ StatState }) => {
  return (
    <ApexChartWrapper sx={{ position: 'relative' }}>
      <Grid container spacing={6} className='match-height' sx={{ pt: 5 }}>
        {/* Applicants Registered */}
        <Grid item xs={12} md={12}>
          <ApexAreaChart
            last7days={StatState?.datesNnumbers}
            last31days={StatState?.lastMonthNumbers}
            applicantsNumber={StatState?.all}
            rate={Math.round(StatState?.incrDecRate)}
            titleOne='Applicants'
            subtitleOne='Aplicants registered.'
          />
        </Grid>
        {/* STATUS */}
        <Grid item xs={12} sm={7}>
          <Status status={StatState?.statusStat} all={StatState?.all} />
        </Grid>
        {/* DOCUMENTS */}
        <Grid item xs={12} sm={6} md={5}>
          <DocumentTypesStat
            docs={StatState?.docStat}
            all={StatState?.all}
            title='Document Types'
            subtitle='Document types in percentage and numbers.'
          />
        </Grid>
        {/* AGE */}
        <Grid item xs={12} sm={12} md={8}>
          <ApexColumnChartAge ageGender={StatState?.ageStat} title='Age Statistics' />
        </Grid>
        {/* GENDER */}
        <Grid item xs={12} sm={12} md={4} color={'secondary'}>
          <ApexDonutChart
            title={'Gender'}
            all={StatState?.all}
            gender={StatState?.genderStat}
            subTitle='Applicants gender statics.'
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
