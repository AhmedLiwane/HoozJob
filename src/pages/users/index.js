// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/users/Table'

const Users = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>User & Providers</Typography>}
        subtitle={<Typography variant='body2'>Manage all of your company's user's profiles.</Typography>}
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Users
