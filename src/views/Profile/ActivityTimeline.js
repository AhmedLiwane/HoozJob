// ** React Imports
import { Fragment, useState } from 'react'
import moment from 'moment'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import List from '@mui/material/List'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'

// ** Icon Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import BarcodeScan from 'mdi-material-ui/BarcodeScan'
import FaceRecognition from 'mdi-material-ui/FaceRecognition'
import AlertCircle from 'mdi-material-ui/AlertCircle'
import FaceManProfile from 'mdi-material-ui/FaceManProfile'
import CreditCardSearch from 'mdi-material-ui/CreditCardSearch'
import Incognito from 'mdi-material-ui/Incognito'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

// ** Demo Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const ActivityTimeline = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [collapsed2, setCollapsed2] = useState(false)

  return (
    <>
      {/* DEVICES */}
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Session devices'
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed2(!collapsed2)}
            >
              {!collapsed2 ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
          }
        />
        <Collapse in={collapsed2}>
          <Divider sx={{ m: 0 }} />

          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableHead
                sx={{ backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default') }}
              >
                <TableRow>
                  <TableCell sx={{ py: 3 }}>Browser</TableCell>
                  <TableCell sx={{ py: 3 }}>Device</TableCell>
                  <TableCell sx={{ py: 3 }}>Location</TableCell>
                  <TableCell sx={{ py: 3 }}>Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* {data.map((item, index) => ( */}
                <TableRow hover sx={{ '&:last-of-type td': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img width='22' height='22' alt='Chrome' src='/images/logos/chrome.png' />
                      <Typography sx={{ ml: 2 }}>item.browser</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>item.device</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>item.location</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>item.recentActivity</TableCell>
                </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </Card>
      {/* TIMELINE */}
      <Card>
        <CardHeader
          title='User Activity Timeline'
          action={
            <IconButton
              size='small'
              aria-label='collapse'
              sx={{ color: 'text.secondary' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
            </IconButton>
          }
        />
        <Collapse in={collapsed}>
          <CardContent>
            <Timeline>
              {/* {session.Events.map((id, key) => ( */}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography sx={{ mr: 2, mb: 1, fontWeight: 600 }}>id?.event</Typography>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      'DD MMM YYYY h:mm:ss a
                    </Typography>
                  </Box>
                  <Typography variant='body2'>
                    <strong>Location :</strong> id?.ipAdress?.country + ' ' + id?.ipAdress?.regionName
                  </Typography>
                  <Typography variant='body2'>
                    <strong>ISP :</strong> id?.ipAdress?.isp
                  </Typography>
                  <Typography variant='body2'>
                    <strong>Browser :</strong> id?.userAgent?.browser?.name
                  </Typography>
                  <Typography variant='body2'>
                    <strong>Device :</strong> id?.userAgent.os?.name
                  </Typography>
                  <Typography variant='body2'>
                    <strong>Ip Adresse :</strong> id?.ipAdress?.query
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              {/* ))} */}
            </Timeline>
          </CardContent>
        </Collapse>
      </Card>
    </>
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
