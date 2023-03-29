// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { useSelector } from 'react-redux'
import TableDense from 'src/views/table/mui/TableDense'

const TabTransactions = () => {
  //** Hooks
  const UserState = useSelector(state => state.UserReducer)

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <TableDense tab={UserState.user.transactions} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabTransactions
