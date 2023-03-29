// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Import

// ** Styled Component Imports

const GeneralInfo = () => {
  // ** States
  const [openAddressCard, setOpenAddressCard] = useState(false)

  return (
    <div>
      <Card>
        <CardHeader
          title='General Information'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
              Edit
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={4}>
              <TableContainer>
                <Table size='small' sx={{ width: '95%' }}>
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
                          First Name:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Pixinvent</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Last Name:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>Pixinvent</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Birthday:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>gertrude@gmail.com</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Age:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>SDF754K77</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/*  */}

            <Grid item xs={12} lg={4}>
              <TableContainer>
                <Table size='small'>
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
                          Email:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>100 Wateand</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Phone Number:
                        </Typography>
                      </TableCell>
                      <TableCell>+1(609) 933-44-22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Address:
                        </Typography>
                      </TableCell>
                      <TableCell>Australia</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Zip Code:
                        </Typography>
                      </TableCell>
                      <TableCell>403114</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/*  */}
            <Grid item xs={12} lg={4}>
              <TableContainer>
                <Table size='small'>
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
                          User ID:
                        </Typography>
                      </TableCell>
                      <TableCell>Queensland</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Status:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <CustomChip
                          skin='light'
                          label='status'
                          color='secondary'
                          sx={{ height: 24, fontSize: '0.75rem', borderRadius: '5px', ml: 2 }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Document Number:
                        </Typography>
                      </TableCell>
                      <TableCell>+1(609) 933-44-22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                          Document Type:
                        </Typography>
                      </TableCell>
                      <TableCell>Australia</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={openAddressCard}
          onClose={() => setOpenAddressCard(false)}
          aria-labelledby='user-address-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-address-edit-description'
        >
          <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Address
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Edit Address for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Pixinvent' label='Company Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='email' size='small' defaultValue='gertrude@gmail.com' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='TAX-875623' label='Tax ID' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='SDF754K77' label='VAT Number' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Billing Address'
                    defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='+1(609) 933-44-22' label='Contact' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id='country-select'>Country</InputLabel>
                    <Select labelId='country-select' defaultValue='usa' label='Country'>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='japan'>Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Capholim' label='State' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' size='small' defaultValue='403114' label='Zip Code' />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpenAddressCard(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  )
}

export default GeneralInfo
