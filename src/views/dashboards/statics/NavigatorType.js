// ** React Imports
import { useState } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import GoogleChrome from 'mdi-material-ui/GoogleChrome'
import Opera from 'mdi-material-ui/Opera'
import AppleSafari from 'mdi-material-ui/AppleSafari'
import Firefox from 'mdi-material-ui/Firefox'
import MicrosoftEdge from 'mdi-material-ui/MicrosoftEdge'
import Web from 'mdi-material-ui/Web'

const RenderTabContent = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        {/* <TableHead>
          <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
            <TableCell>Image</TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>Product Name</TableCell>
            <TableCell align='right'>Revenue</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                '& .MuiTableCell-root': {
                  border: 0,
                  py: theme => `${theme.spacing(1.5)} !important`
                },
                '&:first-child .MuiTableCell-body': {
                  pt: theme => `${theme.spacing(3)} !important`
                },
                '&:last-child .MuiTableCell-body': {
                  pb: theme => `${theme.spacing(3)} !important`
                }
              }}
            >
              <TableCell>
                <Avatar alt={row.imgAlt} variant='rounded' sx={{ width: 34, height: 34 }}>
                  {row.imgSrc}
                </Avatar>
              </TableCell>
              <TableCell>
                <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                  {row.product}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', color: 'text.primary' }}
                >
                  {row.revenue}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const NavigatorType = ({ title, subheader, browser }) => {
  const tabContentData = {
    navigator: [
      {
        revenue: browser.Chrome ? browser.Chrome : 0,
        imgAlt: 'google-chrome',
        product: 'Google Chrome',
        imgSrc: <GoogleChrome />
      },
      {
        revenue: browser.Opera ? browser.Opera : 0,
        imgAlt: 'opera',
        product: 'Opera',
        imgSrc: <Opera />
      },
      {
        revenue: browser.Firefox ? browser.Firefox : 0,
        imgAlt: 'firefox',
        product: 'Firefox',
        imgSrc: <Firefox />
      },
      {
        revenue: browser.Safari ? browser.Safari : 0,
        imgAlt: 'safari',
        product: 'Safari',
        imgSrc: <AppleSafari />
      },
      {
        revenue: browser.Edge ? browser.Edge : 0,
        imgAlt: 'microsoft-edge',
        product: 'Microsoft Edge',
        imgSrc: <MicrosoftEdge />
      },
      {
        revenue: 0,
        imgAlt: 'other-navigators',
        product: 'Others',
        imgSrc: <Web />
      }
    ]
  }
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <TabContext value='navigator'>
        <TabPanel sx={{ p: 0 }} value='navigator'>
          <RenderTabContent data={tabContentData['navigator']} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default NavigatorType
