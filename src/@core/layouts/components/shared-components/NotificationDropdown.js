// ** React Imports
import { useState, Fragment, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import MMenu from '@mui/material/Menu'
import MMenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import Check from 'mdi-material-ui/Check'
import InformationVariant from 'mdi-material-ui/InformationVariant'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import usePagination from './NotificationHook/usePagination'

import { useSelector } from 'react-redux'
import { Backdrop, Badge, CircularProgress, Dialog, DialogActions, DialogTitle, Skeleton, Tooltip } from '@mui/material'
import { DotsVertical, Webhook } from 'mdi-material-ui'
import { markAsRead } from 'src/redux/Teammember/action'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteNotification } from 'src/redux/Teammember/action'
import toast from 'react-hot-toast'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 344,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = props => {
  // wanated to follo< https://codesandbox.io/s/react-hooks-material-ui-pagination-example-trp9o
  // ** Hook
  const MemberState = useSelector(state => state.MemberReducer?.admin)
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const dispatch = useDispatch()

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Props
  const { settings } = props

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const action = async id => {
    dispatch(markAsRead(id))
  }

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  const unread = MemberState.Notifications?.some(notif => !notif.isArchived && !notif.isRead)

  return (
    <Fragment>
      <Tooltip title={'Notifications'}>
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <Badge
            badgeContent={
              MemberState?.Notifications?.filter(notif => !notif.isArchived && notif.isRead === false).length
            }
            color='primary'
          >
            <BellOutline />
          </Badge>
        </IconButton>
      </Tooltip>
      {/* NOTIFICATIONS MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Button href='/notifications' style={{ textTransform: 'none' }} color='primary' size='small'>
              See all notifications
            </Button>
            <Typography
              variant='text'
              disableRipple
              color={unread ? 'primary' : 'secondary'}
              style={{
                fontSize: 12,
                textDecoration: 'underline',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 2
              }}
              onClick={() => action()}
            >
              Mark all as read
              {unread ? (
                <>
                  {/* <CircleSmall
                   style={{
                     fontSize: 26
                   }}
                 /> */}
                  <Skeleton variant='circular' width={15} height={15} />
                </>
              ) : (
                <Check
                  style={{
                    fontSize: 12
                  }}
                />
              )}
            </Typography>
          </Box>
        </MenuItem>
        {MemberState.load ? (
          <Backdrop
            open={load}
            sx={{
              position: 'absolute',
              color: theme => theme.palette.common.white,
              zIndex: theme => theme.zIndex.mobileStepper - 1
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <ScrollWrapper>
            {MemberState.Notifications?.length === 0 ? (
              <MenuItem onClick={handleDropdownClose}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    No Notifications
                  </Typography>
                </Box>
              </MenuItem>
            ) : (
              MemberState?.Notifications?.slice(-5).map((notification, i) => {
                return (
                  !notification.isArchived && (
                    <MenuItem disableRipple key={i}>
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        {notification.isRead ? (
                          <Avatar color='secondary'>
                            <Webhook />
                          </Avatar>
                        ) : (
                          <Badge
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                            }}
                            variant='dot'
                            color='secondary'
                          >
                            <Avatar color='secondary'>
                              <Webhook />
                            </Avatar>
                          </Badge>
                        )}

                        <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                          <MenuItemTitle>{notification.title}</MenuItemTitle>
                          <MenuItemSubtitle noWrap variant='body2'>
                            {notification.content}
                          </MenuItemSubtitle>
                          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                            {moment(notification.createdAt).fromNow()}
                            {/* {day} */}
                          </Typography>
                        </Box>
                        <NotifOptions notification={notification} />
                      </Box>
                    </MenuItem>
                  )
                )
              })
            )}
          </ScrollWrapper>
        )}
      </Menu>
      {/* MODAL */}
    </Fragment>
  )
}

// Notification Options
const NotifOptions = ({ notification }) => {
  const [anchorElTwo, setAnchorElTwo] = useState(null)
  const openTwo = Boolean(anchorElTwo)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  // Notification modal
  const handleNotifOpen = () => {
    setShow(true)
  }

  const handleNotifClose = () => {
    setShow(false)
  }

  // Notification dropdown
  const handleClick = event => {
    setAnchorElTwo(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElTwo(null)
  }

  const markRead = async id => {
    dispatch(markAsRead(id))
  }

  // ** Delete Notification
  const deleteNotif = notificationID => {
    dispatch(deleteNotification(notificationID))
      .then(res => {
        toast.success('Notification deleted successfully.')
      })
      .catch(error => {
        toast.error('An error has accured please try again.')
      })
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={openTwo ? 'long-menu' : undefined}
        aria-expanded={openTwo ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <DotsVertical />
      </IconButton>
      <MMenu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorElTwo}
        open={openTwo}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '14ch'
          }
        }}
      >
        <MMenuItem
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          disableTouchRipple
          disableRipple
          onClick={handleNotifOpen}
        >
          <Typography variant='caption'>More</Typography>
          <InformationVariant sx={{ width: 15 }} />
        </MMenuItem>
        <MMenuItem
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          onClick={() => markRead(notification.id)}
          disableTouchRipple
          disableRipple
        >
          <Typography variant='caption'>Mark as read</Typography>
          <EyeOffOutline sx={{ width: 15 }} />
        </MMenuItem>
        <MMenuItem
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          I
          disableTouchRipple
          disableRipple
          onClick={() => deleteNotif(notification.id)}
        >
          <Typography variant='caption'>Delete</Typography>
          <DeleteOutline sx={{ width: 15 }} />
        </MMenuItem>
      </MMenu>

      {/* NOTIFICATION DIALOG */}
      <Dialog
        open={show}
        onClose={handleNotifClose}
        aria-labelledby='alert-dialog-title'
        fullWidth
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Typography variant='body1'>{notification.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              borderBottom: ' 1px solid #f1f1f1',
              marginBottom: 20
            }}
          >
            <Typography color='dark' variant='subtitle2' sx={{ fontWeight: 600 }}>
              Description :
            </Typography>
            <Typography variant='subtitle2'>{notification.content}</Typography>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'row', gap: 4, borderBottom: ' 1px solid #f1f1f1' }}>
            <Typography color='dark' variant='subtitle2' sx={{ fontWeight: 600 }}>
              Creation date :
            </Typography>
            <Typography variant='subtitle2'> {moment(notification.createdAt).fromNow()}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='small' color='primary' variant='outlined' onClick={handleNotifClose}>
            Close
          </Button>

          <Button size='small' color='error' variant='outlined' onClick={handleNotifClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NotificationDropdown
