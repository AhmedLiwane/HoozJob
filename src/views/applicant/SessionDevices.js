// ** React Imports
import { useState } from 'react'
import moment from 'moment'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import MuiTimeline from '@mui/lab/Timeline'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { Pagination, Stack } from '@mui/material'

// ** Custom Components Imports
import usePagination from 'src/@core/layouts/components/shared-components/NotificationHook/usePagination'

const ActivityTimeline = ({ session }) => {
  // ** States
  const [page, setPage] = useState(1)

  const PER_PAGE = 5
  const _DATA = usePagination(session?.userAgent || [], PER_PAGE)
  const count = Math.ceil(session?.userAgent?.length / PER_PAGE)

  const handleChangePagination = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }
  return (
    <Card sx={{ mb: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <CardHeader title='Session devices' />
        <Divider sx={{ m: 0 }} />
        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <TableHead
              sx={{ backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default') }}
            >
              <TableRow>
                <TableCell sx={{ py: 3 }}>Browser</TableCell>
                <TableCell sx={{ py: 3 }}>Device</TableCell>
                <TableCell sx={{ py: 3 }}>Operating System</TableCell>
                <TableCell sx={{ py: 3 }}>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((item, index) => {
                return (
                  <>
                    <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.browser?.name.toLowerCase().includes('chr') ? (
                            <img width='22' height='22' alt='Chrome' src='/images/logos/chrome.png' />
                          ) : item.browser?.name.toLowerCase().includes('fir') ? (
                            <img width='22' height='22' alt='Chrome' src='/images/logos/firefox.png' />
                          ) : item.browser?.name.toLowerCase().includes('ope') ? (
                            <img width='22' height='22' alt='Chrome' src='/images/logos/opera.png' />
                          ) : item.browser?.name.toLowerCase().includes('saf') ? (
                            <img width='22' height='22' alt='Chrome' src='/images/logos/safari.png' />
                          ) : (
                            <img width='22' height='22' alt='Chrome' src='/images/logos/chrome.png' />
                          )}
                          <Typography sx={{ ml: 2 }}>{item.browser?.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>
                        {item.device?.type ? 'Smart Phone' : 'Computer'}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.os?.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{session.Events[0]?.ipAdress?.regionName}</TableCell>
                    </TableRow>
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack
        alignItems='center'
        justifyContent='end'
        sx={{
          mx: 'auto',
          my: 5
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
    </Card>
  )
}

// Styled Timeline component
const Timeline = styled(MuiTimeline)(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

export default ActivityTimeline
