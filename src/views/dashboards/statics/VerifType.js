// ** React Imports
import { React, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Email from 'mdi-material-ui/Email'
import MessageProcessing from 'mdi-material-ui/MessageProcessing'
import NetworkStrength2 from 'mdi-material-ui/NetworkStrength4'

// ** Icons Imports
import Gmail from 'mdi-material-ui/Gmail'
import Yahoo from 'mdi-material-ui/Yahoo'
import MicrosoftOutlook from 'mdi-material-ui/MicrosoftOutlook'
import At from 'mdi-material-ui/At'

const VerificationType = ({ title, subheader, verifEmail, verifPhone }) => {
  const [collapsedOne, setCollapsedOne] = useState(false)
  const [collapsedTwo, setCollapsedTwo] = useState(false)
  const [phoneSum, setPhoneSum] = useState(0)
  const [emailSum, setEmailSum] = useState(0)

  useEffect(() => {
    setPhoneSum(
      Object.keys(verifPhone).toString() === 'undefined'
        ? 0
        : Object.keys(verifPhone).reduce((sum, key) => sum + parseFloat(verifPhone[key] || 0), 0)
    )
    setEmailSum(
      Object.keys(verifEmail).toString() === 'undefined'
        ? 0
        : Object.keys(verifEmail).reduce((sum, key) => sum + parseFloat(verifEmail[key] || 0), 0)
    )
  }, [])

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <ContentBox
        collapse={collapsedOne}
        setCollapse={setCollapsedOne}
        title='Emails'
        data='emails'
        icon={<Email fontSize='small' sx={{ color: 'primary.main' }} />}
        nb={emailSum}
        verifEmail={verifEmail}
        verifPhone={verifPhone}
      />
      <Divider sx={{ my: 0 }} />
      <ContentBox
        collapse={collapsedTwo}
        setCollapse={setCollapsedTwo}
        title='Phones'
        data='phones'
        icon={<MessageProcessing fontSize='small' sx={{ color: 'primary.main' }} />}
        nb={phoneSum}
        verifPhone={verifPhone}
        verifEmail={verifEmail}
      />
    </Card>
  )
}

const ContentBox = ({ collapse, setCollapse, icon, title, nb, data, verifEmail, verifPhone }) => {
  return (
    <CardContent sx={{ py: theme => `${theme.spacing(6.625)} !important` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 6.5, display: 'flex', position: 'relative' }}>
            <CircularProgress
              size={60}
              value={100}
              thickness={5}
              variant='determinate'
              sx={{
                position: 'absolute',
                '& .MuiCircularProgress-circle': { strokeWidth: 4 },
                color: theme =>
                  theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.customColors.bodyBg
              }}
            />
            <CircularProgress
              size={60}
              value={nb}
              thickness={5}
              color='primary'
              variant='determinate'
              sx={{ '& .MuiCircularProgress-circle': { strokeWidth: 4, strokeLinecap: 'round' } }}
            />
            <Box sx={{ mt: -3, ml: -2.5, top: '50%', left: '50%', display: 'flex', position: 'absolute' }}>{icon}</Box>
          </Box>
          <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6' sx={{ mr: 1.75 }}>
                {nb}
              </Typography>
            </Box>
            <Typography variant='body2'>{title}</Typography>
          </div>
        </Box>
        <IconButton
          size='small'
          aria-label='collapse'
          sx={{ color: 'text.secondary', justifyContent: 'end' }}
          onClick={() => setCollapse(!collapse)}
        >
          {!collapse ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
        </IconButton>
      </Box>
      <CollapseBox collapse={collapse} data={data} verifEmail={verifEmail} verifPhone={verifPhone} />
    </CardContent>
  )
}

const CollapseBox = ({ collapse, data, verifEmail, verifPhone }) => {
  const first = () => {}
  useEffect(() => {
    first()
  }, [])

  const tabContentData = {
    emails: [
      {
        numbers: verifEmail?.Gmail ? verifEmail?.Gmail : 0,
        imgAlt: 'gmail',
        product: 'Gmail',
        imgSrc: <Gmail />
      },
      {
        numbers: verifEmail?.Yahoo ? verifEmail?.Yahoo : 0,
        imgAlt: 'yahoo',
        product: 'Yahoo',
        imgSrc: <Yahoo />
      },
      {
        numbers: verifEmail?.Outlook ? verifEmail?.Outlook : 0,
        imgAlt: 'outlook',
        product: 'Outlook',
        imgSrc: <MicrosoftOutlook />
      },
      {
        numbers: verifEmail?.Others ? verifEmail?.Others : 0,
        imgAlt: 'Others',
        product: 'Others',
        imgSrc: <At />
      }
    ],
    phones: [
      {
        numbers: verifPhone?.Telecom ? verifPhone?.Telecom : 0,
        imgAlt: 'tunisie-telecom',
        product: 'Tunisie Telecom',
        imgSrc: <NetworkStrength2 />
      },
      {
        numbers: verifPhone?.Orange ? verifPhone?.Orange : 0,
        imgAlt: 'orange',
        product: 'Orange',
        imgSrc: <NetworkStrength2 />
      },
      {
        numbers: verifPhone?.Ooredoo ? verifPhone?.Ooredoo : 0,
        imgAlt: 'ooredoo',
        product: 'Ooredoo',
        imgSrc: <NetworkStrength2 />
      }
    ]
  }

  return (
    <Collapse in={collapse}>
      <CardContent>
        <RenderTabContent data={tabContentData[data]} />
      </CardContent>
    </Collapse>
  )
}

const RenderTabContent = ({ data }) => {
  return (
    <TableContainer>
      <Table>
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
                  {row.numbers}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default VerificationType
