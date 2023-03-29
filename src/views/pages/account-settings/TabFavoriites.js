// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { useSelector } from 'react-redux'
import TableFavDense from 'src/views/table/mui/TableFavDense'

const TabTransactions = () => {
  //** Hooks
  const UserState = useSelector(state => state.UserReducer)

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <TableFavDense tab={UserState.user.favProviders} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabTransactions
