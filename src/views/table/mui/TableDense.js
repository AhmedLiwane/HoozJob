// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CustomChip from 'src/@core/components/mui/chip'

const rows = ['Created', 'Approved', 'In Progress', 'Completed', 'Declined']
const rows2 = ['secondary', 'info', 'warning', 'success', 'error']

const TableDense = ({ tab }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Final Price</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Booked on / at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tab.map((row, key) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => {
                window.location.href = `/transaction/${row.id}`
              }}
            >
              <TableCell component='th' scope='row'>
                {row.category}
              </TableCell>
              <TableCell align='right'>{row.description}</TableCell>
              <TableCell align='right'>${row.finalPrice}</TableCell>
              <TableCell align='right'>{row.address}</TableCell>
              <TableCell align='right'>
                <CustomChip
                  skin='normal'
                  size='small'
                  label={rows[row.status]}
                  color={rows2[row.status]}
                  sx={{ textTransform: 'capitalize' }}
                />
              </TableCell>
              <TableCell align='right'>{row.bookingDate + ' / ' + row.bookingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDense
