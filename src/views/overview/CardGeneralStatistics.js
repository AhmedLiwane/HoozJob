// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import { Divider, Pagination, Stack, TableHead } from '@mui/material'

// ** Icons Imports
import CreditCard from 'mdi-material-ui/CreditCard'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import usePagination from 'src/@core/layouts/components/shared-components/NotificationHook/usePagination'

// **

const CardGeneralStatistics = ({ CompanyState }) => {
  // ** States
  let [page, setPage] = useState(1)
  const PER_PAGE = 3
  const _DATA = usePagination(CompanyState?.billing?.spendings || [], PER_PAGE)
  const count = Math.ceil(CompanyState?.billing?.spendings?.length / PER_PAGE)

  const handleChangePagination = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }
  return (
    <Card>
      <CardHeader
        title='Wallet'
        subheader='Money spending statistics'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Box sx={{ mb: 5.75, display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 50, height: 50 }}>
            <CreditCard sx={{ fontSize: '2rem' }} />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h4'>
              {CompanyState?.billing?.wallet?.amount > 0 ? CompanyState?.billing?.wallet?.amount : 0} DT
            </Typography>
            <Typography variant='caption'>Last 6 Month Profit</Typography>
          </Box>
        </Box>

        <Divider />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Purchase date</TableCell>
                <TableCell align='right'>Last amount</TableCell>
                <TableCell align='right'>Session Price</TableCell>
                <TableCell align='right'>Rest</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-of-type td': { border: 0 },
                      '& .MuiTableCell-root': {
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 },
                        py: theme => `${theme.spacing(2.75)} !important`
                      }
                    }}
                  >
                    <TableCell align='left'>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {new Date(row.creationDate).toDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {row.lastAmount} DT
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {row.sessionPrice} DT
                      </Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {row.currentAmount} DT
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Stack
            alignItems='center'
            sx={{
              mt: 5
            }}
          >
            <Pagination
              count={count}
              page={page}
              variant='outlined'
              shape='rounded'
              color='primary'
              onChange={handleChangePagination}
            />
          </Stack>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default CardGeneralStatistics
