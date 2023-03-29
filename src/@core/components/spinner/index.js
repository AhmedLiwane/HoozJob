// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <CircularProgress size={20} disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner