import { Card, CardContent, CardHeader } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Icons Imports
import MicrosoftWindows from 'mdi-material-ui/MicrosoftWindows'
import Apple from 'mdi-material-ui/Apple'
import Penguin from 'mdi-material-ui/Penguin'
import Android from 'mdi-material-ui/Android'

const OS = ({ title, os, subheader }) => {
  const [windows, setWindows] = useState(0)
  const [linux, setLinux] = useState(0)
  const [apple, setApple] = useState(0)
  const [android, setAndroid] = useState(0)

  useEffect(() => {
    setWindows(os.filter(t => t.includes('Windows', 'windows')).length)
    setLinux(os.filter(t => t.includes('Linux', 'linux')).length)
    setApple(os.filter(t => t.includes('apple', 'mac', 'iphone')).length)
    setAndroid(os.filter(t => t.includes('Android', 'android')).length)
  }, [os])

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Demo>
          <List>
            <ListItemBox name='Windows' icon={<MicrosoftWindows />} labels={windows} />
            <ListItemBox name='Linux' icon={<Penguin />} labels={linux} />
            <ListItemBox name='Android' icon={<Android />} labels={android} />
            <ListItemBox name='Apple' icon={<Apple />} labels={apple} />
          </List>
        </Demo>
      </CardContent>
    </Card>
  )
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

const ListItemBox = ({ name, icon, labels }) => {
  return (
    <ListItem
      secondaryAction={
        <CustomChip
          skin='light'
          size='smtotal'
          color='primary'
          label={labels}
          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
        />
      }
    >
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  )
}

export default OS
