// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Collapse from '@mui/material/Collapse'
import { Box } from '@mui/system'
import { Divider } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import CardAccountDetails from 'mdi-material-ui/CardAccountDetails'
import Passport from 'mdi-material-ui/Passport'
import CardAccountDetailsOutline from 'mdi-material-ui/CardAccountDetailsOutline'
import SmartCardOffOutline from 'mdi-material-ui/SmartCardOffOutline'

const GeneralInfo = ({ data, load }) => {
  // ** States
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {}, [data])

  if (load) {
    return (
      <Card sx={{ position: 'relative' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2 }}>
              <CardAccountDetails /> Applicant Information
            </Box>
          }
          titleTypographyProps={{ variant: 'h6' }}
        />
      </Card>
    )
  } else {
    return (
      <Box>
        {data?.DocType === 'ID_CARD' ? (
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2 }}>
                  <CardAccountDetails /> ID Card Information
                </Box>
              }
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Box
                  size='small'
                  aria-label='collapse'
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {!collapsed ? (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronDown fontSize='small' /> More
                    </Typography>
                  ) : (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronUp fontSize='small' /> Less
                    </Typography>
                  )}
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} lg={3.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
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
                              Arabic First Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.arName ? data?.DocInfo?.arName : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Arabic Last Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.arSurname ? data?.DocInfo?.arSurname : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Gender
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>{data?.Gender ? data?.Gender : 'None'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/*  */}

                <Grid item xs={12} lg={4.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                    <Table size='small'>
                      <TableBody
                        sx={{
                          '& .MuiTableCell-root': {
                            border: 0,
                            pt: 2,
                            pb: 2,
                            pl: '0 !important',
                            pr: '2 !important',
                            '&:first-of-type': {
                              width: 100
                            }
                          }
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Address
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.Adress ? data?.DocInfo?.Adress : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Country
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>{data?.Country ? data?.Country : 'None'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              City
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.location ? data?.DocInfo?.location : 'None'}
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
                              Profession
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.Profession ? data?.DocInfo?.Profession : 'None'}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              CIN Number
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.CinNumber ? data?.DocInfo?.CinNumber : 'None'}{' '}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Collapse in={collapsed}>
                <Divider sx={{ mx: 2, my: 4 }} />
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={3.5}>
                    <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
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
                                Arabic Full Last Name:
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.FullSurname ? data?.DocInfo?.FullSurname : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Mother Full Name:
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.MotherFullName ? data?.DocInfo?.MotherFullName : 'None'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {/*  */}

                  <Grid item xs={12} lg={4.5}>
                    <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                      <Table size='small'>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '2 !important',
                              '&:first-of-type': {
                                width: 100
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Age
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.Age ? data?.DocInfo?.Age : 'None'}{' '}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Birthday
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.BirthDate ? data?.DocInfo?.BirthDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Birth Place
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.arBirthLocation ? data?.DocInfo?.arBirthLocation : 'None'}
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
                                Creation Date
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.CreationDate ? data?.DocInfo?.CreationDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Location:
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.Location ? data?.DocInfo?.Location : 'None'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                {/*  */}
              </Collapse>
            </CardContent>
          </Card>
        ) : data?.DocType === 'DRIVER' ? (
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2 }}>
                  <CardAccountDetailsOutline /> Driver License Information
                </Box>
              }
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Box
                  size='small'
                  aria-label='collapse'
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {!collapsed ? (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronDown fontSize='small' /> More
                    </Typography>
                  ) : (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronUp fontSize='small' /> Less
                    </Typography>
                  )}
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} lg={3.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
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
                              Arabic First Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.arName ? data?.DocInfo?.arName : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Arabic Last Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.arSurname ? data?.DocInfo?.arSurname : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Gender
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>{data?.Gender ? data?.Gender : 'None'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/*  */}

                <Grid item xs={12} lg={4.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                    <Table size='small'>
                      <TableBody
                        sx={{
                          '& .MuiTableCell-root': {
                            border: 0,
                            pt: 2,
                            pb: 2,
                            pl: '0 !important',
                            pr: '2 !important',
                            '&:first-of-type': {
                              width: 100
                            }
                          }
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              English First name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.enName ? data?.DocInfo?.enName : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              English Last name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.enSurname ? data?.DocInfo?.enSurname : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Address
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.Adress ? data?.DocInfo?.Adress : 'None'}
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
                              Document ID
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.DocumentId ? data?.DocInfo?.DocumentId : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              CIN Number
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.CinNumber ? data?.DocInfo?.CinNumber : 'None'}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Collapse in={collapsed}>
                <Divider sx={{ mx: 2, my: 4 }} />
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={3.5}>
                    <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
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
                                Age
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.Age ? data?.DocInfo?.Age : 'None'}{' '}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Birthday
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.BirthDate ? data?.DocInfo?.BirthDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Birth Place
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.arBirthLocation ? data?.DocInfo?.arBirthLocation : 'None'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {/*  */}

                  <Grid item xs={12} lg={4.5}>
                    <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                      <Table size='small'>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '2 !important',
                              '&:first-of-type': {
                                width: 100
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                English Birth Place
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.enBirthLocation ? data?.DocInfo?.enBirthLocation : 'None'}
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
                                Creation Date
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.CreationDate ? data?.DocInfo?.CreationDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Expiration Date
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.ExpirationDate ? data?.DocInfo?.ExpirationDate : 'None'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                {/*  */}
              </Collapse>
            </CardContent>
          </Card>
        ) : data?.DocType === 'PASSPORT' ? (
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2 }}>
                  <Passport /> Passport Information
                </Box>
              }
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Box
                  size='small'
                  aria-label='collapse'
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  {!collapsed ? (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronDown fontSize='small' /> More
                    </Typography>
                  ) : (
                    <Typography variant='body2' sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <ChevronUp fontSize='small' /> Less
                    </Typography>
                  )}
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} lg={4.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
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
                              English First Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.enName ? data?.DocInfo?.enName : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              English Last Name
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.enSurname ? data?.DocInfo?.enSurname : 'None'}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/*  */}

                <Grid item xs={12} lg={3.5}>
                  <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                    <Table size='small'>
                      <TableBody
                        sx={{
                          '& .MuiTableCell-root': {
                            border: 0,
                            pt: 2,
                            pb: 2,
                            pl: '0 !important',
                            pr: '2 !important',
                            '&:first-of-type': {
                              width: 100
                            }
                          }
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Gender
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>{data?.Gender ? data?.Gender : 'None'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Profession
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.Profession
                              ? data?.DocInfo?.Profession.includes('vault:v1')
                                ? 'None'
                                : data?.DocInfo?.Profession
                              : 'None'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              Country
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>{data?.Country ? data?.Country : 'None'}</TableCell>
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
                              Document ID
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.DocumentId ? data?.DocInfo?.DocumentId : 'None'}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                              CIN Number
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: 'right' }}>
                            {data?.DocInfo?.CinNumber ? data?.DocInfo?.CinNumber : 'None'}{' '}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Collapse in={collapsed}>
                <Divider sx={{ mx: 2, my: 4 }} />
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={4.5}>
                    <TableContainer sx={{ borderRight: 1, borderColor: '#E0E0E0' }}>
                      <Table size='small'>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '2 !important',
                              '&:first-of-type': {
                                width: 100
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Age
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.Age ? data?.DocInfo?.Age : 'None'}{' '}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Birthday
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.BirthDate ? data?.DocInfo?.BirthDate : 'None'}
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
                                Creation Date
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.CreationDate ? data?.DocInfo?.CreationDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Expiration Date
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.ExpirationDate ? data?.DocInfo?.ExpirationDate : 'None'}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>
                                Location
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                              {data?.DocInfo?.Location ? data?.DocInfo?.Location : 'None'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
                {/*  */}
              </Collapse>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2, color: 'orange' }}>
                  <SmartCardOffOutline /> Document Not Selected !
                </Box>
              }
              titleTypographyProps={{ variant: 'h6' }}
            />
          </Card>
        )}
      </Box>
    )
  }
}

export default GeneralInfo
