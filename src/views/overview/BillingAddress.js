// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'

// ** Hooks
import { useDispatch } from 'react-redux'

// ** Styled Components
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'

const BillingAddress = ({ CompanyState }) => {
  // ** States
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [updates, setUpdates] = useState({})
  const [loadingBtn, setLoadingBtn] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()

  const onChange = e => {
    setUpdates({ ...updates, [e.target.id]: e.target.value })
  }

  return (
    <Card>
      <CardHeader
        title='Billing Information'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small' sx={{ width: '100%' }}>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                    border: 0,
                    pt: 2,
                    pb: 2,
                    pl: '0 !important',
                    pr: '0 !important',
                    '&:first-of-type': {
                      width: 148
                    }
                  }
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Company Name:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600', fontWeight: '600' }}>
                      {CompanyState?.company?.CompanyName ? CompanyState?.company?.CompanyName : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Billing Email:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.company?.CompanyEmail ? CompanyState?.company?.CompanyEmail : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Billing Address:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {' '}
                      {CompanyState?.company?.CompanyAdresse ? CompanyState?.company?.CompanyAdresse : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Contact:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      (+216){' '}
                      {CompanyState?.company?.CompanyPhoneNumber ? CompanyState?.company?.CompanyPhoneNumber : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Country:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.company?.CompanyCountry ? CompanyState?.company?.CompanyCountry : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      State:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.company?.CompanyCity ? CompanyState?.company?.CompanyCity : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Zip Code:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.company?.CompanyZipCode ? CompanyState?.company?.CompanyZipCode : 'None'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small' sx={{ width: '100%' }}>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                    border: 0,
                    pt: 2,
                    pb: 2,
                    pl: '0 !important',
                    pr: '0 !important',
                    '&:first-of-type': {
                      width: 148
                    }
                  }
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Created by:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.billing?.modifiedBy?.firstName} {CompanyState?.billing?.modifiedBy?.lastName}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Job Title:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600' }}>
                      {CompanyState?.billing?.modifiedBy?.jobTitle}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <TableContainer>
            <Table size='small' sx={{ width: '100%' }}>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                    border: 0,
                    pt: 2,
                    pb: 2,
                    pl: '0 !important',
                    pr: '0 !important',
                    '&:first-of-type': {
                      width: 148
                    }
                  }
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                      Tax:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' sx={{ ml: 6, fontWeight: '600', fontWeight: '600' }}>
                      19%
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </CardContent>

      <Dialog
        open={openAddressCard}
        onClose={() => {
          setOpenAddressCard(false)
          setUpdates({})
        }}
        aria-labelledby='user-address-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-address-edit-description'
      >
        <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          Edit Address
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Edit Address for future billing
          </DialogContentText>
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='CompanyName'
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyName}
                  label='Company Name'
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='CompanyEmail'
                  type='email'
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyEmail}
                  label='Email'
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  size='small'
                  label='Billing Address'
                  defaultValue={CompanyState?.company?.CompanyAdresse}
                  onChange={onChange}
                  id='CompanyAdresse'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyPhoneNumber}
                  label='Contact'
                  onChange={onChange}
                  id='CompanyPhoneNumber'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyCountry}
                  label='Country'
                  onChange={onChange}
                  id='CompanyCountry'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyCity}
                  label='State'
                  onChange={onChange}
                  id='CompanyCity'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='number'
                  size='small'
                  defaultValue={CompanyState?.company?.CompanyZipCode}
                  label='Zip Code'
                  onChange={onChange}
                  id='CompanyZipCode'
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <LoadingButton variant='contained' loading={loadingBtn} sx={{ mr: 1 }} onClick={''}>
            Submit
          </LoadingButton>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => {
              setOpenAddressCard(false)
              setUpdates({})
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default BillingAddress
