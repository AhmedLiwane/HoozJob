// ** React Imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import { Backdrop, CardContent, CircularProgress } from '@mui/material'

// Redux Imports
import { useSelector } from 'react-redux'

const LivenessTab = () => {
  // ** Hooks
  const ApplicantState = useSelector(state => state.ApplicantReducer)

  return (
    <Card title='ID Card' sx={{ position: 'relative' }}>
      <CardHeader title='Liveness Pictures' />
      {ApplicantState.load ? (
        <Backdrop
          open={ApplicantState.load}
          sx={{
            position: 'absolute',
            color: theme => theme.palette.common.white,
            zIndex: theme => theme.zIndex.mobileStepper - 1
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <>
          {ApplicantState?.liveness ? (
            <CardContent
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row', gap: 20 },
                justifyContent: 'space-around'
              }}
            >
              <Box
                sx={{
                  px: 4
                }}
              >
                <CardHeader subheader='Looking Up' />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 400 }}
                    image={
                      ApplicantState?.liveness?.up
                        ? 'data:image/jpeg;base64,' + ApplicantState?.liveness?.up
                        : '/images/cards/idcard.jpg'
                    }
                    alt='Live from space album cover'
                  />
                </Box>
              </Box>
              <Box>
                <CardHeader subheader='Looking Down' />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 400 }}
                    image={
                      ApplicantState?.liveness?.down
                        ? 'data:image/jpeg;base64,' + ApplicantState?.liveness?.down
                        : '/images/cards/idcard.jpg'
                    }
                    alt='Live from space album cover'
                  />
                </Box>
              </Box>
              <Box>
                <CardHeader subheader='Looking Right' />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 400 }}
                    image={
                      ApplicantState?.liveness?.right
                        ? 'data:image/jpeg;base64,' + ApplicantState?.liveness?.right
                        : '/images/cards/idcard.jpg'
                    }
                    alt='Live from space album cover'
                  />
                </Box>
              </Box>
              <Box>
                <CardHeader subheader='Looking Left' />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 400 }}
                    image={
                      ApplicantState?.liveness?.left
                        ? 'data:image/jpeg;base64,' + ApplicantState?.liveness?.left
                        : '/images/cards/idcard.jpg'
                    }
                    alt='Live from space album cover'
                  />
                </Box>
              </Box>
              <Box>
                <CardHeader subheader='Selfie' />
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <CardMedia
                    component='img'
                    sx={{ width: 400 }}
                    image={
                      ApplicantState?.liveness?.selfie
                        ? 'data:image/jpeg;base64,' + ApplicantState?.liveness?.selfie
                        : '/images/cards/idcard.jpg'
                    }
                    alt='Live from space album cover'
                  />
                </Box>
              </Box>
            </CardContent>
          ) : (
            <CardContent sx={{ textAlign: 'center', width: '100%' }}>No Liveness pictures yet.</CardContent>
          )}
        </>
      )}
    </Card>
  )
}

export default LivenessTab
