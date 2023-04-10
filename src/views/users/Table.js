// ** React Imports
import { useEffect, useState, useCallback } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
import CardAccountDetailsOutline from 'mdi-material-ui/CardAccountDetailsOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import moment from 'moment'

// ** Custom Components Imports
import TableHeader from 'src/views/users/TableHeader'
import { useDispatch } from 'react-redux'
import { getAllUsers, removeUser } from 'src/redux/User/action'
import { Delete, EyeRemoveOutline } from 'mdi-material-ui'

// ** Vars
const userStatusObj = {
  Accepted: 'success',
  Normal: 'secondary',
  Pending: 'warning',
  Declined: 'error'
}

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = row => {
  return (
    <AvatarWithoutImageLink href={`/applicant/${row.id}`}>
      <CustomAvatar
        skin='dark'
        color={userStatusObj[row.Status]}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {row.userFullName[0]}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const UserList = () => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [pageSize, setPageSize] = useState(10)
  const [users, setUsers] = useState([])
  const [word, setWord] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    dispatch(getAllUsers())
      .then(res => {
        if (res.data.code === 200) {
          setUsers(res.data.data)
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }, [])

  const deleteUser = async id => {
    setLoading(true)
    dispatch(removeUser(id)).then(res => {
      dispatch(getAllUsers()).then(res => {
        if (res.data.code === 200) {
          setUsers(res.data.data)
          setLoading(false)
        }
      })
    })
  }

  // ** Grid Columns
  const columns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'userFullName',
      headerName: 'User',
      sortable: true,
      renderCell: ({ row }) => {
        const { id, userFullName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Link href={`/user/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {userFullName}
                </Typography>
              </Link>
              <Link href={`/user/${id}`} passHref>
                <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                  - @{id}
                </Typography>
              </Link>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'email',
      headerName: 'Email / Phone',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' noWrap>
              {row.userEmail.Email} <br /> {row.userPhoneNumber.Number}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'Status',
      headerName: 'Type',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='normal'
            size='small'
            label={row.Status}
            color={userStatusObj[row.Status]}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <>
          <Link href={`/user/${row.id}`} passHref>
            <IconButton>
              <EyeOutline />
            </IconButton>
          </Link>
          <IconButton sx={{ cursor: 'pointer' }} onClick={() => deleteUser(row.id)}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ]

  // ** handle search word
  const handleSearch = searchWord => {
    setWord(searchWord)
  }

  // ** handle search status
  const handleStatus = selectedStatus => {
    setStatus(selectedStatus)
  }

  const emptyGrid = () => {
    return <Typography sx={{ textAlign: 'center', mt: 10 }}>No Users.</Typography>
  }

  // ** Filter users
  const filteredData = users?.filter(f => {
    return (
      (status === 'All' || f.Status === status) &&
      (word === '' ||
        f.userEmail.Email.toLowerCase().includes(word.toLowerCase()) ||
        f.userPhoneNumber.Number.includes(word.toLowerCase()) ||
        f.userFullName.toLowerCase().includes(word.toLowerCase()) ||
        f.id.toLowerCase().includes(word.toLowerCase()))
    )
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader users={users} handleSearch={handleSearch} handleStatus={handleStatus} />
          <div style={{ position: 'relative' }}>
            <DataGrid
              components={{ NoRowsOverlay: emptyGrid }}
              autoHeight
              rows={filteredData}
              columns={columns}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 }, position: 'relative' }}
              disableColumnMenu
            />
            <Backdrop
              sx={{
                zIndex: theme => theme.zIndex.drawer + 1,
                position: 'absolute',
                color: theme => theme.palette.common.white,
                zIndex: theme => theme.zIndex.mobileStepper - 1
              }}
              open={loading}
            >
              <CircularProgress color='inherit' />
            </Backdrop>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
