// ** React Imports
import { useEffect, useState } from 'react'

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
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import

// ** Custom Components Imports
import TableHeader from 'src/views/admins/TableHeader'
import { useDispatch } from 'react-redux'
import { Delete } from 'mdi-material-ui'
import { getAllAdmins, removeAdmin } from 'src/redux/Teammember/action'

// ** Vars
const userStatusObj = {
  Pro: 'success',
  Normal: 'secondary',
  Pending: 'warning'
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
  const [admins, setAdmins] = useState([])
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    dispatch(getAllAdmins())
      .then(res => {
        if (res.data.code === 200) {
          setAdmins(res.data.data)
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }, [])

  const deleteUser = async id => {
    setLoading(true)
    dispatch(removeAdmin(id)).then(res => {
      dispatch(getAllAdmins())
        .then(res => {
          if (res.data.code === 200) {
            setAdmins(res.data.data)
            setLoading(false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  // ** Grid Columns
  const columns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'userFullName',
      headerName: 'Admin Full Name',
      sortable: true,
      renderCell: ({ row }) => {
        const { id, userFullName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Link href={`/admin/${id}`} passHref>
                <Typography
                  noWrap
                  component='a'
                  variant='subtitle2'
                  sx={{ color: 'text.primary', textDecoration: 'none' }}
                >
                  {userFullName}
                </Typography>
              </Link>
              <Link href={`/admin/${id}`} passHref>
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
      headerName: 'Email',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' noWrap>
              {row.Email}
            </Typography>
          </Box>
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
          <Link href={`/admin/${row.id}`} passHref>
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

  const emptyGrid = () => {
    return <Typography sx={{ textAlign: 'center', mt: 10 }}>No Admins.</Typography>
  }

  // ** Filter users
  const filteredData = admins?.filter(f => {
    return (
      word === '' ||
      f.Email.toLowerCase().includes(word.toLowerCase()) ||
      f.userFullName.toLowerCase().includes(word.toLowerCase()) ||
      f.id.toLowerCase().includes(word.toLowerCase())
    )
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader admins={admins} handleSearch={handleSearch} />
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
