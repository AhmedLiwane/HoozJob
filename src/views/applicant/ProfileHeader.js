import { React, useEffect, useState } from 'react'

// ** MUI Imports
import { Badge, Card } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { LoadingButton } from '@mui/lab'

// ** Custom Components
import moment from 'moment'
import EditInfo from './EditInfoCin'
import EditInfoDriver from './EditInfoDriver'
import EditInfoPass from './EditInfoPassport'

// ** Icons Import
import PencilOutline from 'mdi-material-ui/PencilOutline'
import { SmartCardOffOutline } from 'mdi-material-ui'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ProfileHeader = ({ session, data }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openEditInfo, setOpenEditInfo] = useState(false)
  const [openEditInfoDriver, setOpenEditInfoDriver] = useState(false)
  const [openEditInfoPass, setOpenEditInfoPass] = useState(false)

  useEffect(() => {}, [session, data])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Card sx={{ ml: 4, p: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { sm: 'row', xs: 'column' },
          justifyContent: { sm: 'space-between', xs: 'center' },
          gap: 12
        }}
      >
        <Box>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Badge
                overlap='circular'
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={
                  <BadgeContentSpan
                    sx={{
                      backgroundColor:
                        data?.Status === 'Accepted'
                          ? '#72E128'
                          : data?.Status === 'Refused'
                          ? ' #FF4D49'
                          : data?.Status === 'Pending'
                          ? '#9e9e9e'
                          : data?.Status === 'Created'
                          ? '#31C9F9'
                          : data?.Status === 'Manuel'
                          ? '#fbc02d'
                          : 'grey'
                    }}
                  />
                }
                anchorOrigin={{
                  vertical: 'Top',
                  horizontal: 'left'
                }}
              >
                <Avatar
                  sx={{ width: 75, height: 75 }}
                  alt={`Avatar n°`}
                  src={'data:image/jpeg;base64,' + data?.Liveness?.selfie?.path}
                />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2, mb: 2 }}>
                  <Typography
                    onClick={() =>
                      data?.DocType === 'ID_CARD'
                        ? setOpenEditInfo(true)
                        : data?.DocType === 'PASSPORT'
                        ? setOpenEditInfoPass(true)
                        : data?.DocType === 'DRIVER'
                        ? setOpenEditInfoDriver(true)
                        : setOpenDialog(true)
                    }
                    variant='body2'
                    sx={{
                      ml: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                      color: '#207CF0',
                      cursor: 'pointer',
                      mb: 4,
                      ml: -2
                    }}
                    display='inline'
                  >
                    <PencilOutline sx={{ fontSize: '20px' }} /> Edit Info
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyItems: 'center' }}>
                    {data?.ApplicantFullName}{' '}
                    <Box
                      sx={{
                        fontSize: '0.75rem',
                        borderRadius: '5px',
                        ml: 2,
                        p: 2,
                        color:
                          data?.Status === 'Accepted'
                            ? '#72E12E'
                            : data?.Status === 'Refused'
                            ? '#FF544E'
                            : data?.Status === 'Pending'
                            ? 'secondary'
                            : data?.Status === 'Created'
                            ? '#26C6F9'
                            : data?.Status === 'Manuel'
                            ? '#FDB74C'
                            : '#207CF0',
                        backgroundColor:
                          data?.Status === 'Accepted'
                            ? '#EEFBE5'
                            : data?.Status === 'Refused'
                            ? '#FFE9E9'
                            : data?.Status === 'Pending'
                            ? '#EDEFF1'
                            : data?.Status === 'Created'
                            ? '#E5F8FE'
                            : data?.Status === 'Manuel'
                            ? '#FFF6E5'
                            : '#E3EDFC'
                      }}
                    >
                      {' '}
                      {data?.Status}
                    </Box>
                  </Box>
                </Typography>
              }
              secondary={
                <>
                  <Box sx={{ m: 0 }}>
                    <Typography sx={{ mb: 2 }} variant='body2'>
                      {data?.DocInfo?.Adress}
                    </Typography>
                    {data?.ApplicantPhoneNumber?.tries?.length === 0 ? (
                      <></>
                    ) : (
                      <Typography sx={{ mb: 2 }} variant='body2'>
                        (+216) {data?.ApplicantPhoneNumber?.number}{' '}
                      </Typography>
                    )}
                    {data?.ApplicantEmail?.tries?.length === 0 ? (
                      <></>
                    ) : (
                      <Typography sx={{ mb: 2 }} variant='body2'>
                        {data?.ApplicantEmail?.Email} (Tries : {data?.ApplicantEmail?.tries?.length})
                      </Typography>
                    )}
                  </Box>
                  {data?.Status === 'Pending' ? (
                    <></>
                  ) : (
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ mr: 3 }}>
                        Score :
                      </Typography>
                      <Typography
                        variant='body2'
                        color={data?.Score > 5 ? '#72E128' : data?.Score > 3 ? '#FF891A' : '#FF5754'}
                      >
                        {data?.Score}
                      </Typography>
                    </Box>
                  )}
                </>
              }
            />
          </ListItem>
        </Box>
        <Box>
          {' '}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { sm: 'flex-end', xs: 'flex-start' } }}>
            <Box sx={{ mb: 2, display: 'flex' }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Creation date:
              </Typography>
              <Typography variant='body2'>{moment(session?.creationDate).format('LL')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Last modified :
              </Typography>
              <Typography variant='body2'>
                {data?.Modifications?.reverse()[0]
                  ? moment(data?.Modifications?.reverse()[0]?.modifiedAt).format('LL')
                  : 'No Modifications Made'}
              </Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex' }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                Modified By:
              </Typography>
              <Typography variant='body2'>
                {data?.Modifications?.reverse()[0]
                  ? data?.Modifications?.reverse()[0]?.modifiedBy
                  : 'No Modifications Made'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography variant='body2' sx={{ mr: 3 }}>
                User ID :
              </Typography>
              <Typography variant='body2'>{data?.id}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* DIALOGS */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Change applicant
          <Typography display='inline' sx={{ fontWeight: 600 }}>
            &nbsp; {data?.ApplicantFullName} &nbsp;
          </Typography>
          Information{' '}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Box sx={{ display: 'flex', flexDrirection: 'row', alignItems: 'center', gap: 2, color: 'orange' }}>
              <SmartCardOffOutline /> Document Not Selected !
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleCloseDialog}>Close</LoadingButton>
        </DialogActions>
      </Dialog>
      <EditInfo openEditInfo={openEditInfo} setOpenEditInfo={setOpenEditInfo} data={data} />
      <EditInfoPass openEditInfoPass={openEditInfoPass} setOpenEditInfoPass={setOpenEditInfoPass} data={data} />
      <EditInfoDriver
        openEditInfoDriver={openEditInfoDriver}
        setOpenEditInfoDriver={setOpenEditInfoDriver}
        data={data}
      />
    </Card>
  )
}

export default ProfileHeader
