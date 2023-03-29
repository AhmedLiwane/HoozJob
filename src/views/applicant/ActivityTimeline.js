// ** React Imports
import { useState } from 'react'
import moment from 'moment'

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
import { Pagination, Stack, Tooltip } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'

// ** Custom Components Imports
import usePagination from 'src/@core/layouts/components/shared-components/NotificationHook/usePagination'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import PlayCircleOutline from 'mdi-material-ui/PlayCircleOutline'
import ClipboardCheckMultipleOutline from 'mdi-material-ui/ClipboardCheckMultipleOutline'
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import Laptop from 'mdi-material-ui/Laptop'
import CardAccountDetailsOutline from 'mdi-material-ui/CardAccountDetailsOutline'
import UploadOutline from 'mdi-material-ui/UploadOutline'
import Import from 'mdi-material-ui/Import'
import TimerSand from 'mdi-material-ui/TimerSand'
import SortCalendarAscending from 'mdi-material-ui/SortCalendarAscending'
import SortCalendarDescending from 'mdi-material-ui/SortCalendarDescending'

const ActivityTimeline = ({ session }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [collapsed2, setCollapsed2] = useState(false)
  const [descDate, setDescDate] = useState(false)

  return (
    <Card>
      <CardHeader
        title='User Activity Timeline'
        action={
          <>
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
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
          </>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>
          <Timeline>
            {session?.Events?.map((event, key) => (
              <TimelineItem key={key}>
                <TimelineSeparator>
                  {event?.event?.includes('started') ? (
                    <PlayCircleOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('terms') ? (
                    <ClipboardCheckMultipleOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('verified') ? (
                    <LockCheckOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('email') ? (
                    <EmailOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('computer') ? (
                    <Laptop color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('document') &&
                    event?.event?.includes('chose') &&
                    !event?.event?.includes('import') ? (
                    <CardAccountDetailsOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('Upload') ? (
                    <UploadOutline color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('import') ? (
                    <Import color='primary' sx={{ mt: 1 }} />
                  ) : event?.event?.includes('result') ? (
                    <TimerSand color='primary' sx={{ mt: 1 }} />
                  ) : (
                    <TimelineDot color='primary' />
                  )}

                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent onClick={() => setCollapsed2(!collapsed2)} sx={{ cursor: 'pointer' }}>
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Tooltip title={'Click to see details.'}>
                      <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>{event?.event}</Typography>
                    </Tooltip>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {event?.dateEvent}
                    </Typography>
                  </Box>
                  <Collapse in={collapsed2}>
                    <Typography variant='body2'>
                      <strong>Location :</strong> {event?.ipAdress?.country + ' ' + event?.ipAdress?.regionName}
                    </Typography>{' '}
                    <Typography variant='body2'>
                      <strong>ISP :</strong> {event?.ipAdress?.isp}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Browser :</strong> {event?.userAgent?.browser?.name}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Device :</strong> {event?.device?.type ? 'Smart Phone' : 'Computer'}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Ip Adresse :</strong> {event?.ipAdress?.query}
                    </Typography>
                  </Collapse>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Collapse>
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
