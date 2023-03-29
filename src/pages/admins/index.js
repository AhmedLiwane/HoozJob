// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/admins/Table'

const Admins = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Admin Team Members</Typography>}
        subtitle={<Typography variant='body2'>Manage all of your company's admins.</Typography>}
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Admins
