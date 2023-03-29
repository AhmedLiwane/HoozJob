// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import Attachment from 'mdi-material-ui/Attachment'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { useSelector } from 'react-redux'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SendInvoiceDrawer = ({ open, toggle }) => {
  // ** Hooks
  const CompanyState = useSelector(state => state.CompanyReducer)

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      sx={{ '& .MuiDrawer-paper': { width: [300, 400] } }}
      ModalProps={{ keepMounted: true }}
    >
      <Header>
        <Typography variant='h6'>Send Invoice</Typography>
        <Close fontSize='small' onClick={toggle} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField type='text' label='Invoice' variant='outlined' value={CompanyState.invoice.visibleID} />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField type='text' label='From' variant='outlined' value={CompanyState.company.CompanyName} />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField type='text' label='To' variant='outlined' value='Eva Dam technology' />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField label='RIB' variant='outlined' value='08 307 0005910978073 39' />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField label='IBAN' variant='outlined' value='TN59 0830 7000 5910 9780 7339' />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 6 }}>
          <TextField label='BIC' variant='outlined' value='BIATTNTT' />
        </FormControl>
        <Typography variant='body2' sx={{ mt: 6, cursor: 'pointer' }}>
          <strong>Note: </strong> Once the transfer is complete, kindly send us the receipt to our mail: info@HoozJob.io
        </Typography>
        {/* <Box sx={{ mb: 6 }}>
          <CustomChip
            size='small'
            skin='light'
            color='primary'
            label='Invoice Attached'
            sx={{ borderRadius: '5px' }}
            icon={<Attachment fontSize='small' />}
          />
        </Box> */}
        {/* <Box>
          <Button size='large' variant='contained' onClick={toggle} sx={{ mr: 4 }}>
            Send
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </Box> */}
      </Box>
    </Drawer>
  )
}

export default SendInvoiceDrawer
