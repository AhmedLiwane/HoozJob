// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'
import CustomChip from 'src/@core/components/mui/chip'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import usePagination from 'src/@core/layouts/components/shared-components/NotificationHook/usePagination'

const CardPaymentHistory = ({ data }) => {
  let [page, setPage] = useState(1)
  const PER_PAGE = 7
  const _DATA = usePagination(data || [], PER_PAGE)

  const count = Math.ceil(data.length / PER_PAGE)

  const handleChangePagination = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

  return (
    <Card>
      <CardHeader
        title='Payment History'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              <TableCell>
                <Typography variant='subtitle2' align='left' sx={{ textTransform: 'capitalize' }}>
                  # / Item
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' align='left' sx={{ textTransform: 'capitalize' }}>
                  Attempt Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' align='left' sx={{ textTransform: 'capitalize' }}>
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' align='left' sx={{ textTransform: 'capitalize' }}>
                  Amount
                </Typography>
              </TableCell>
              <TableCell align='left'>
                <Typography variant='subtitle2' align='left' sx={{ textTransform: 'capitalize' }}>
                  Status
                </Typography>
              </TableCell>
              {/* <TableCell align='right'>
                <Typography variant='subtitle2' sx={{ textTransform: 'capitalize' }}>
                  Actions
                </Typography>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(3)} !important` } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'left' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {row.title}
                        </Typography>
                        <Typography variant='body2' sx={{ fontWeight: 300, color: 'text.secondary' }}>
                          {row.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ display: 'flex', alignItems: 'left' }} variant='caption'>
                      {new Date(row.creationDate).toDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ display: 'flex', alignItems: 'left' }} variant='caption'>
                      {new Date(row.creationDate).getHours() + ':' + new Date(row.creationDate).getMinutes()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {row.amount + ' DT/TTC'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {row.status === 'completed' ? (
                      <CustomChip size='small' skin='light' color='success' label='Paid' />
                    ) : row.status === 'failed' ? (
                      <CustomChip size='small' skin='light' color='error' label='Failed' />
                    ) : row.status === 'canceled' ? (
                      <CustomChip size='small' skin='light' color='warning' label='Canceled' />
                    ) : row.status === 'refunded' ? (
                      <CustomChip size='small' skin='light' color='primary' label='Refunded' />
                    ) : row.status === 'created' ? (
                      <CustomChip size='small' skin='light' color='info' label='Created' />
                    ) : (
                      <CustomChip size='small' skin='light' color='secondary' label='Pending' />
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Stack alignItems='center'>
          <Pagination
            sx={{ padding: '20px' }}
            count={count}
            page={page}
            variant='outlined'
            shape='rounded'
            color='primary'
            onChange={handleChangePagination}
          />
        </Stack>
      </TableContainer>
    </Card>
  )
}

export default CardPaymentHistory
