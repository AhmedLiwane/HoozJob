// ** React Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Autorenew from 'mdi-material-ui/Autorenew'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { getAllUsers, getUser } from 'src/redux/User/action'
import { getAdmin } from 'src/redux/Teammember/action'

const SyncBtn = () => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Router
  const router = useRouter()
  const { id } = router.query

  const handleSync = () => {
    dispatch(getAdmin())

    // Applicants list
    if (window.location.pathname.includes('/users/')) {
      dispatch(getAllUsers())

      // Applications list
    } else if (window.location.pathname.includes(`/user/${id}`)) {
      dispatch(getUser(id))
    }
  }

  return (
    <Tooltip title='Synchronize'>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleSync}>
        <Autorenew />
      </IconButton>
    </Tooltip>
  )
}

export default SyncBtn
