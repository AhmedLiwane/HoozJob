import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import { Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const LivenessTab = () => {
  const [frontID, setFront] = useState('/images/cards/idcard.jpg')

  return (
    <Card
      title='ID Card'
      sx={{
        p: 6,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: { xs: 'column', sm: 'row', gap: 20 },
        justifyContent: 'space-around'
      }}
    >
      <Box>
        <CardHeader subheader='Looking Up' />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <CardMedia component='img' sx={{ width: 400 }} image={frontID} alt='Live from space album cover' />
        </Box>
      </Box>
      <Box>
        {' '}
        <CardHeader subheader='Looking Down' />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <CardMedia component='img' sx={{ width: 400 }} image={frontID} alt='Live from space album cover' />
        </Box>
      </Box>
      <Box>
        {' '}
        <CardHeader subheader='Looking Right' />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <CardMedia component='img' sx={{ width: 400 }} image={frontID} alt='Live from space album cover' />
        </Box>
      </Box>
      <Box>
        {' '}
        <CardHeader subheader='Looking Left' />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <CardMedia component='img' sx={{ width: 400 }} image={frontID} alt='Live from space album cover' />
        </Box>
      </Box>
    </Card>
  )
}

export default LivenessTab
