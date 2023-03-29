// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Next Imports
import { useRouter } from 'next/router'

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const AnalyticsCongratulations = ({ Name }) => {
  // ** Hook
  const { settings } = useSettings()
  const router = useRouter()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              Welcome{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {Name}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='body2'>Thank you for choosing our solution.</Typography>
            <Typography sx={{ mb: 4.5 }} variant='body2'>
              Feel free to take a look around.
            </Typography>
            <Button variant='contained' onClick={() => router.push('/account-settings')}>
              View Profile
            </Button>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src={`/images/cards/illustration-john-${settings.mode}.png`} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
