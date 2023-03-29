// ** React Imports
import { Fragment, useState } from 'react'

import Collapse from '@mui/material/Collapse'
import ListItemText from '@mui/material/ListItemText'

import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import FileCompare from 'mdi-material-ui/FileCompare'
import FaceRecognition from 'mdi-material-ui/FaceRecognition'
import FaceManProfile from 'mdi-material-ui/FaceManProfile'
import CreditCardSearch from 'mdi-material-ui/CreditCardSearch'
import Incognito from 'mdi-material-ui/Incognito'
import Check from 'mdi-material-ui/Check'
import Close from 'mdi-material-ui/Close'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const SecurityChecks = ({ data }) => {
  const [liveness, setLiveness] = useState(false)

  const handleLiveness = () => {
    setLiveness(!liveness)
  }

  return (
    <Card sx={{ mb: 6 }}>
      <CardHeader title='Security Checks' />
      <CardContent>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          <ListBox
            title='Face Match'
            errorCause='Face does not match.'
            icon={
              <FaceRecognition
                color={
                  data?.Status !== 'Pending'
                    ? data?.Tests?.faceMatch == true
                      ? 'success'
                      : data?.Tests?.faceMatch == false
                      ? 'error'
                      : ''
                    : ''
                }
              />
            }
            data={data}
            state={data?.Tests?.faceMatch}
          />
          <ListBox
            errorCause='Liveness does not match.'
            title='Liveness Check'
            icon={
              <FaceManProfile
                color={
                  data?.Status !== 'Pending'
                    ? data?.Tests?.faceLive == true
                      ? 'success'
                      : data?.Tests?.faceLive == false
                      ? 'error'
                      : ''
                    : ''
                }
              />
            }
            state={data?.Tests?.faceLive}
            data={data}
          />
          <ListBox
            title='Authentic Document'
            errorCause='Document not authentic.'
            icon={
              <CreditCardSearch
                color={
                  data?.Status !== 'Pending'
                    ? data?.Tests?.templateMatch == true
                      ? 'success'
                      : data?.Tests?.templateMatch == false
                      ? 'error'
                      : ''
                    : ''
                }
              />
            }
            state={data?.Tests?.templateMatch}
            data={data}
          />
          {data?.DocInfo?.DocType === 'ID_CARD' ? (
            <ListBox
              title='Documents Match'
              errorCause='Document not authentic.'
              icon={
                <FileCompare
                  color={
                    data?.Status !== 'Pending'
                      ? data?.Tests?.barcodeMatch == true
                        ? 'success'
                        : data?.Tests?.barcodeMatch == false
                        ? 'error'
                        : ''
                      : ''
                  }
                />
              }
              state={data?.Tests?.barcodeMatch}
              data={data}
            />
          ) : (
            ''
          )}

          <ListBox
            title='Suspicious Behavior'
            errorCause=''
            icon={
              <Incognito color={data?.Status !== 'Pending' ? (!data?.isPrivate == false ? 'error' : 'success') : ''} />
            }
            state={!data?.isPrivate}
            data={data}
          />
        </List>
      </CardContent>
    </Card>
  )
}

const ListBox = ({ title, icon, state, data, errorCause }) => {
  const [faceMatch, setFaceMatch] = useState(false)
  const handleFaceMatch = () => {
    setFaceMatch(!faceMatch)
  }
  return (
    <>
      <ListItemButton onClick={handleFaceMatch}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {/* <Check /> */}
        {data?.Status !== 'Pending' ? (
          state ? (
            <Check color='success' />
          ) : (
            <Close color='error' />
          )
        ) : (
          <CircularProgress color='inherit' disableShrink size={20} />
        )}
      </ListItemButton>
      {data?.Status === 'Pending' || state ? (
        <></>
      ) : (
        <Collapse in={faceMatch} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 6 }}>
              <ListItemIcon>
                <AlertCircleOutline />
              </ListItemIcon>
              <ListItemText secondary={errorCause} />
            </ListItemButton>
          </List>
        </Collapse>
      )}
    </>
  )
}

export default SecurityChecks
