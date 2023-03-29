// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CustomChip from 'src/@core/components/mui/chip'
import { Rating } from '@mui/material'

const rows = ['Created', 'Approved', 'In Progress', 'Completed', 'Declined']
const rows2 = ['secondary', 'info', 'warning', 'success', 'error']

const TableDense = ({ tab }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Provider Full Name</TableCell>
            <TableCell align='left'>Bio</TableCell>
            <TableCell align='left'>Category</TableCell>
            <TableCell align='left'>Address</TableCell>
            <TableCell align='right'>Ratings</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tab.map((row, key) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 }, cursor: 'pointer' }}
              onClick={() => {
                window.location.href = `/user/${row.id}`
              }}
            >
              <TableCell component='th' scope='row'>
                {row.userFullName}
              </TableCell>
              <TableCell align='left'>{row.providerInfo.bio}</TableCell>
              <TableCell align='left'>{row.providerInfo.Category}</TableCell>
              <TableCell align='left'>{row.address}</TableCell>
              <TableCell align='right'>
                <Rating value={row.providerInfo.rate} readOnly name='read-only' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDense
