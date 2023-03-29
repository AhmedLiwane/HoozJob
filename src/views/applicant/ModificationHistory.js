// ** React Imports
import { useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import { Collapse, IconButton, Pagination, Stack, Tooltip } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// ** Custom Components Imports
import usePagination from 'src/@core/layouts/components/shared-components/NotificationHook/usePagination'
import moment from 'moment'

// ** Icons Imports
import SortCalendarAscending from 'mdi-material-ui/SortCalendarAscending'
import SortCalendarDescending from 'mdi-material-ui/SortCalendarDescending'
import ClockCheckOutline from 'mdi-material-ui/ClockCheckOutline'
import ClockMinusOutline from 'mdi-material-ui/ClockMinusOutline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const ModificationHistory = ({ data }) => {
  let [page, setPage] = useState(1)
  let [collapse, setCollapse] = useState(false)
  const [descDate, setDescDate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorRef = useRef()

  const PER_PAGE = 6
  const _DATA = usePagination(data?.Modifications || [], PER_PAGE)
  const count = Math.ceil(data?.Modifications?.length / PER_PAGE)

  const handleChangePagination = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

  return (
    <Card>
      <CardHeader
        title='Modifications History'
        action={
          <IconButton onClick={() => setDescDate(!descDate)}>
            {descDate ? (
              <Tooltip title='Last Date'>
                <SortCalendarDescending />
              </Tooltip>
            ) : (
              <Tooltip title='First Date'>
                <SortCalendarAscending />
              </Tooltip>
            )}
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Timeline sx={{ my: 0, py: 0 }}>
          {/*  */}
          {_DATA.currentData().length > 0 ? (
            <>
              {_DATA.currentData().map((modification, index) => {
                return (
                  <>
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color='secondary' />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          mt: 0,
                          overflow: 'hidden',
                          mb: theme => `${theme.spacing(2)} !important`,
                          cursor: 'pointer'
                        }}
                      >
                        <Box
                          sx={{
                            mb: 3,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}

                          // onClick={() => setCollapse(!collapse)}
                        >
                          <Typography sx={{ mr: 2, fontWeight: 600 }}>
                            {modification.description ? modification.description : 'No description'}
                          </Typography>
                          <Typography variant='caption'>
                            {moment(modification.modifiedAt).format('LL')} by {modification.modifiedBy}
                          </Typography>
                        </Box>
                        {/* <Collapse in={collapse} timeout='auto' unmountOnExit>
                        <TableContainer component={Paper}>
                          <Table aria-label='customized table'>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell width={'18%'}>Element</StyledTableCell>
                                <StyledTableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyItems: 'center',
                                      gap: 4,
                                      mb: 2
                                    }}
                                  >
                                    <ClockCheckOutline />
                                    <Typography variant='body2'>Current Info</Typography>
                                  </Box>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: 4 }}>
                                    <ClockMinusOutline />
                                    <Typography variant='body2'>Old Info</Typography>
                                  </Box>
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Collapse> */}
                      </TimelineContent>
                    </TimelineItem>
                  </>
                )
              })}
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
            </>
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%' }}>No Modifications.</Box>
          )}
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ModificationHistory
