// ** React Imports
import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Card, Collapse, IconButton, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'

// ** Redux Imports
import { useSelector } from 'react-redux'

// ** Icons Imports
import { ArrowRightBold, Check, Close, CloseCircleOutline } from 'mdi-material-ui'

const CompleteIntegration = ({ isOpen, callBack }) => {
  const router = useRouter()

  // ** States
  const [open, setOpen] = useState(false)
  const [collapseFlow, setCollapseFlow] = useState(false)
  const [collapseApp, setCollapseApp] = useState(false)
  const [collapseWebh, setCollapseWebh] = useState(false)

  // ** Hooks
  const integrationReducer = useSelector(state => state.IntegrationReducer)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <Fragment>
      <Dialog open={open} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle
          id='alert-dialog-title'
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          You need to complete your integration settings
          <IconButton onClick={() => setOpen(false)}>
            <CloseCircleOutline />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Card
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              px: 4,
              py: 2,
              borderRadius: 0,
              '&:hover': {
                backgroundColor: '#f1f1f1'
              }
            }}
            onClick={() => setCollapseFlow(!collapseFlow)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                width: '100%'
              }}
            >
              {integrationReducer?.allFlows?.length > 0 ? (
                <Check sx={{ fontSize: 18 }} color='success' />
              ) : (
                <Close sx={{ fontSize: 18 }} color='error' />
              )}
              1- Create Flow
            </Box>
            <Tooltip title='Head to Flow'>
              <IconButton onClick={() => (router.push('/integration/flow/'), callBack(false))}>
                <ArrowRightBold />
              </IconButton>
            </Tooltip>
          </Card>
          <Collapse in={collapseFlow}>
            <Typography sx={{ p: 4 }}>
              First step towards a successfull integration, you need to step up your own personal flow. A flow is how
              you would like the order of the process to be. You can have as many flows as you want. Each flow can be
              assigned to multiple applications.
            </Typography>
          </Collapse>
          <Card
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              px: 4,
              borderRadius: 0,
              py: 2,
              '&:hover': {
                backgroundColor: '#f1f1f1'
              }
            }}
            onClick={() => setCollapseWebh(!collapseWebh)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                width: '100%'
              }}
            >
              {integrationReducer?.allHooks?.length > 0 ? (
                <Check sx={{ fontSize: 18 }} color='success' />
              ) : (
                <Close sx={{ fontSize: 18 }} color='error' />
              )}
              2- Create Webhook
            </Box>
            <Tooltip title='Head to Webhooks'>
              <IconButton onClick={() => (router.push('/integration/webhooks/'), callBack(false))}>
                <ArrowRightBold />
              </IconButton>
            </Tooltip>
          </Card>
          <Collapse in={collapseWebh}>
            <Typography sx={{ p: 4 }}>
              Create a webhook to recieve details of your applicant's verification process onto. Procceed to set up an
              endpoint. Each webhook can be assigned to multiple applications.
            </Typography>
          </Collapse>
          <Card
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              px: 4,
              borderRadius: 0,
              py: 2,
              '&:hover': {
                backgroundColor: '#f1f1f1'
              }
            }}
            onClick={() => setCollapseApp(!collapseApp)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                width: '100%'
              }}
            >
              {integrationReducer?.allApp?.length > 0 ? (
                <Check sx={{ fontSize: 18 }} color='success' />
              ) : (
                <Close sx={{ fontSize: 18 }} color='error' />
              )}
              3- Create Application
            </Box>
            <Tooltip title='Head to Applications'>
              <IconButton onClick={() => (router.push('/integration/applications/'), callBack(false))}>
                <ArrowRightBold />
              </IconButton>
            </Tooltip>
          </Card>
          <Collapse in={collapseApp}>
            <Typography sx={{ p: 4 }}>
              Applications are the most important tool here. Each application contains a specific flow and webhook. Use
              the application's secret and public key to communicate with HoozJob's server. Only one application can be
              active at a time.
            </Typography>
          </Collapse>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default CompleteIntegration
