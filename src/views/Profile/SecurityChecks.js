// ** React Imports
import { useState } from 'react'

import Collapse from '@mui/material/Collapse'
import ListItemText from '@mui/material/ListItemText'

import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'

// ** Icon Imports
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import BarcodeScan from 'mdi-material-ui/BarcodeScan'
import FaceRecognition from 'mdi-material-ui/FaceRecognition'
import FaceManProfile from 'mdi-material-ui/FaceManProfile'
import CreditCardSearch from 'mdi-material-ui/CreditCardSearch'
import Incognito from 'mdi-material-ui/Incognito'
import Close from 'mdi-material-ui/Close'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const SecurityChecks = () => {
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
          <ListBox title='Face Match' icon={<FaceRecognition />} />
          <ListBox title='Liveness Check' icon={<FaceManProfile />} />
          <ListBox title='Liveness Check' icon={<CreditCardSearch />} />
          <ListBox title='Liveness Check' icon={<BarcodeScan />} />
          <ListBox title='Liveness Check' icon={<Incognito />} />
        </List>
      </CardContent>
    </Card>
  )
}

const ListBox = ({ title, icon }) => {
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
        <Close />
      </ListItemButton>
      <Collapse in={faceMatch} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 6 }}>
            <ListItemIcon>
              <AlertCircleOutline />
            </ListItemIcon>
            <ListItemText secondary='cause of the error ?' />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  )
}

export default SecurityChecks
