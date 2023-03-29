// ** React Imports
import { useRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

// ** Third Party Imports
import ReactToPdf from 'react-to-pdf'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@mui/material'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCard = () => {
  // ** Hook
  const theme = useTheme()
  const CompanyState = useSelector(state => state.CompanyReducer)

  // ** Ref
  const PreviewRef = useRef(null)

  if (CompanyState?.invoice) {
    return (
      <Card>
        <Box ref={PreviewRef}>
          <CardContent>
            <Grid container>
              <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                    <svg width={40} fill='none' height={22} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fill={theme.palette.primary.main}
                        transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                      />
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fillOpacity='0.4'
                        fill='url(#paint0_linear_7821_79167)'
                        transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                      />
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fill={theme.palette.primary.main}
                        transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                      />
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fill={theme.palette.primary.main}
                        transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                      />
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fillOpacity='0.4'
                        fill='url(#paint1_linear_7821_79167)'
                        transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                      />
                      <rect
                        rx='25.1443'
                        width='50.2886'
                        height='143.953'
                        fill={theme.palette.primary.main}
                        transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                      />
                      <defs>
                        <linearGradient
                          y1='0'
                          x1='25.1443'
                          x2='25.1443'
                          y2='143.953'
                          id='paint0_linear_7821_79167'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop />
                          <stop offset='1' stopOpacity='0' />
                        </linearGradient>
                        <linearGradient
                          y1='0'
                          x1='25.1443'
                          x2='25.1443'
                          y2='143.953'
                          id='paint1_linear_7821_79167'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop />
                          <stop offset='1' stopOpacity='0' />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                      {themeConfig.templateName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='body2' sx={{ mb: 1 }}>
                      71 Av. Jean Jaurès Tunis, Tunisia
                    </Typography>
                    <Typography variant='body2'>(+216) 50 800 447, 51 979 762, 29 130 770</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Table sx={{ maxWidth: '200px' }}>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='h6'>Invoice</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='h6'>{`#${CompanyState?.invoice.visibleID}`}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Issued:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>
                            {new Date(CompanyState?.invoice.issuedDate).toDateString()}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Date Due:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>
                            {new Date(CompanyState?.invoice.dueDate).toDateString()}
                          </Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 6.5, mb: 5.5 }} />

          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
                <div>
                  <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                    Invoice To:
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Name:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.name}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Company name:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.companyName}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Address:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.address}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Contact:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.contact}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Email:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.companyEmail}</Typography>
                          </MUITableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
                <div>
                  <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                    Bill To:
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Total Due:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice?.totalTTC + ' DT/TTC'}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Bank name:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>Biat</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>Country:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>{CompanyState?.invoice.country}</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>IBAN:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'>08307000591097807339</Typography>
                          </MUITableCell>
                        </TableRow>
                        <TableRow>
                          <MUITableCell>
                            <Typography variant='body2'>SWIFT code:</Typography>
                          </MUITableCell>
                          <MUITableCell>
                            <Typography variant='body2'> BIATTNTTTET</Typography>
                          </MUITableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 6.5, mb: 0 }} />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>duration</TableCell>
                  <TableCell>qty</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{CompanyState?.invoice?.plan?.title}</TableCell>
                  <TableCell>{CompanyState?.invoice?.plan?.subtitle}</TableCell>
                  <TableCell>{CompanyState?.invoice?.plan?.plan}</TableCell>
                  <TableCell>{CompanyState?.invoice?.quantity}</TableCell>
                  <TableCell>{CompanyState?.invoice?.plan?.price + ' ' + CompanyState?.invoice?.plan?.unit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <CardContent sx={{ pt: 8 }}>
            <Grid container>
              <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                <CalcWrapper>
                  <Typography variant='body2'>Subtotal:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    {CompanyState?.invoice.plan?.price + ' ' + CompanyState?.invoice.plan?.unit}
                  </Typography>
                </CalcWrapper>
                <CalcWrapper>
                  <Typography variant='body2'>Tax:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    19%
                  </Typography>
                </CalcWrapper>
                <Divider sx={{ mt: 5, mb: 3 }} />
                <CalcWrapper>
                  <Typography variant='body2'>Total:</Typography>
                  <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                    {CompanyState?.invoice?.totalTTC + ' DT/TTC' + ''}
                  </Typography>
                </CalcWrapper>
              </Grid>
            </Grid>
          </CardContent>

          <Divider sx={{ mt: 4.5, mb: 0 }} />

          <CardContent>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind
              for future freelance projects. Thank You!
            </Typography>
          </CardContent>
        </Box>
        <CardContent>
          <Box sx={{ mt: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Link href={`/apps/print/${CompanyState?.invoice.id}`} passHref>
              <Button sx={{ mr: 4 }} target='_blank' component='a' variant='contained'>
                Print
              </Button>
            </Link>

            <ReactToPdf scale={0.845} targetRef={PreviewRef} filename={`${CompanyState?.invoice.id}.pdf`}>
              {({ toPdf }) => {
                return (
                  <Button variant='contained' color='success' onClick={toPdf}>
                    Download
                  </Button>
                )
              }}
            </ReactToPdf>
          </Box>
        </CardContent>
      </Card>
    )
  } else if (CompanyState.load) {
    return (
      <Backdrop
        open={CompanyState.load}
        sx={{
          position: 'absolute',
          color: theme => theme.palette.common.white,
          zIndex: theme => theme.zIndex.mobileStepper - 1
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return null
  }
}

export default PreviewCard
