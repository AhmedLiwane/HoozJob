// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/transactions/Table'

const Transactions = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Transactions</Typography>}
        subtitle={<Typography variant='body2'>Manage all of the transactions between users & providers.</Typography>}
      />
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Transactions
