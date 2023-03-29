// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import Link from 'next/link'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { Backdrop, CircularProgress, Fab, Icon, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { deleteCategory, getCategories } from 'src/redux/Categories/actions'
import { Delete, EyeOutline } from 'mdi-material-ui'

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.image) {
    return <CustomAvatar src={row.image} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.categoryName)}
      </CustomAvatar>
    )
  }
}

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'Refused', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const Categories = () => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** States
  const [pageSize, setPageSize] = useState(7)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'category',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.categoryName}
              </Typography>
              <Typography noWrap variant='caption'>
                -@{row.idCategory}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Created At',
      field: 'creationDate',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(row.creationDate).toDateString()}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'description',
      headerName: 'Description',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.description}
        </Typography>
      )
    },
    {
      flex: 0.125,
      field: 'subCat',
      minWidth: 80,
      headerName: 'Number of sub categories',
      renderCell: ({ row }) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {row.subCategories.length}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <>
          <Link href={`/category/${row.idCategory}`} passHref>
            <IconButton>
              <EyeOutline />
            </IconButton>
          </Link>
          <IconButton sx={{ cursor: 'pointer' }} onClick={() => removeCategory(row.idCategory)}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ]

  useEffect(() => {
    setLoading(true)
    dispatch(getCategories())
      .then(res => {
        if (res.data.code === 200) {
          setLoading(false)
          setCategories(res.data.data)
        }
      })
      .catch(err => {
        setLoading(false)
        toast.error('Something went wrong')
      })
  }, [])

  const removeCategory = async id => {
    setLoading(true)

    dispatch(deleteCategory(id))
      .then(res => {
        dispatch(getCategories())
          .then(result => {
            if (result.data.code === 200) {
              setCategories(result.data.data)
              setLoading(false)
              toast.success('Deleted category')
            }
          })
          .catch(err => {
            setLoading(false)
            toast.error('Something went wrong')
          })
      })
      .catch(err => {
        setLoading(false)
        toast.error('Something went wrong')
      })
  }

  return (
    <Card>
      <CardHeader title='Categories' />
      <DataGrid
        autoHeight
        getRowId={row => row.idCategory}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={categories}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
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
    </Card>
  )
}

export default Categories
