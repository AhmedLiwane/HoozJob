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
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Components Imports
import TableHeader from 'src/views/transactions/TableHeader'
import { useDispatch } from 'react-redux'
import { Close, Delete } from 'mdi-material-ui'
import {
  removeTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction
} from 'src/redux/Transactions/actions'
import {
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { forwardRef } from 'react'

// ** Vars
const userStatusObj = ['Created', 'Approved', 'In Progress', 'Completed', 'Declined']
const userStatusObj2 = ['secondary', 'info', 'warning', 'success', 'error']

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

// ** renders client column
const renderClient = row => {
  return (
    <AvatarWithoutImageLink href={`/transaction/${row.id}`}>
      <CustomAvatar
        skin='dark'
        color={userStatusObj2[row.status]}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {row.category[0]}
      </CustomAvatar>
    </AvatarWithoutImageLink>
  )
}

const TransactionList = () => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [show, setShow] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [transaction, setTransaction] = useState({})
  const [transactionId, setTransactionId] = useState('')
  const [transactions, setTransactions] = useState([])
  const [word, setWord] = useState('')
  const [status, setStatus] = useState('')
  const [statusChecked, setStatusChecked] = useState(0)
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    dispatch(getAllTransactions())
      .then(res => {
        if (res.data.code === 200) {
          setTransactions(res.data.data)
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setValues({
      creatorId: transaction.creatorId,
      category: transaction.category,
      subCategory: transaction.subCategory,
      address: transaction.address,
      bookingDate: transaction.bookingDate,
      bookingTime: transaction.bookingTime,
      description: transaction.description,
      finalPrice: transaction.finalPrice,
      status: transaction.status
    })
  }, [transaction])

  const deleteTransaction = async id => {
    setLoading(true)
    dispatch(removeTransaction(id)).then(res => {
      dispatch(getAllTransactions()).then(res => {
        if (res.data.code === 200) {
          setTransactions(res.data.data)
          setLoading(false)
        }
      })
    })
  }

  const showTransaction = async id => {
    setTransactionId(id)

    const myPromise = dispatch(getTransaction(id)).then(res => {
      if (res.data.code === 200) {
        setTransaction(res.data.data)
        setStatusChecked(res.data.data.status)
        setShow(true)
      }
    })
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: 'Fetched',
      error: `Something went wrong`
    })
  }

  useEffect(() => {
    console.log(values)
  }, [values])

  // ** Grid Columns
  const columns = [
    {
      flex: 0.25,
      minWidth: 230,
      field: 'category',
      headerName: 'Category',
      sortable: true,
      renderCell: ({ row }) => {
        const { id, category } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}
              onClick={() => showTransaction(id)}
            >
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {category}
              </Typography>
              <Typography
                onClick={() => showTransaction(id)}
                noWrap
                component='a'
                variant='caption'
                sx={{ textDecoration: 'none' }}
              >
                - @{id}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'description',
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' noWrap>
              {row.description}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'bookingDate',
      headerName: 'Booked on / at',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' noWrap>
              {row.bookingDate} / {row.bookingTime}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'finalPrice',
      headerName: 'Final Price',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' noWrap>
              $ {row.finalPrice}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='normal'
            size='small'
            label={userStatusObj[row.status]}
            color={userStatusObj2[row.status]}
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
          <IconButton onClick={() => showTransaction(row.id)}>
            <EyeOutline />
          </IconButton>
          <IconButton sx={{ cursor: 'pointer' }} onClick={() => deleteTransaction(row.id)}>
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
    return <Typography sx={{ textAlign: 'center', mt: 10 }}>No Transactions.</Typography>
  }

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const saveChanges = async () => {
    setLoading(true)

    const myPromise = dispatch(updateTransaction(transactionId, values))
      .then(res => {
        if (res.data.code === 200) {
          setLoading(false)
        }
      })
      .catch(err => {
        setLoading(false)
      })
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: 'Updated transaction',
      error: 'Something went wrong'
    })
  }

  // ** Filter transactions
  const filteredData = transactions?.filter(f => {
    return (
      (status === 'All' || f.status === status) &&
      (word === '' ||
        f.category.toLowerCase().includes(word.toLowerCase()) ||
        f.description.includes(word.toLowerCase()) ||
        f.bookingDate.toLowerCase().includes(word.toLowerCase()) ||
        f.bookingTime.toLowerCase().includes(word.toLowerCase()) ||
        f.jobTitle.toLowerCase().includes(word.toLowerCase()) ||
        f.finalPrice.toString() === word ||
        f.id.toLowerCase().includes(word.toLowerCase()))
    )
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader transactions={transactions} handleSearch={handleSearch} handleStatus={handleStatus} />
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
        <Dialog
          fullWidth
          open={show}
          maxWidth='md'
          scroll='body'
          onClose={() => setShow(false)}
          TransitionComponent={Transition}
          onBackdropClick={() => setShow(false)}
        >
          <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                Transaction details
              </Typography>
              <Typography variant='body2'>You can directly edit this transaction here.</Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={transaction.creatorId}
                  label='Created By'
                  id='creatorId'
                  onChange={onChangeInfo}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  onChange={onChangeInfo}
                  fullWidth
                  defaultValue={transaction.selectedProvider || 'No provider has been selected yet'}
                  label='Provider Chosen'
                  id='selectedProvider'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={transaction.category}
                  onChange={onChangeInfo}
                  label='Category'
                  id='category'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  defaultValue={transaction.subCategory}
                  onChange={onChangeInfo}
                  label='Sub Category'
                  id='subCategory'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  defaultValue={transaction.description}
                  onChange={onChangeInfo}
                  label='Description'
                  id='description'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  label='Address'
                  onChange={onChangeInfo}
                  defaultValue={transaction.address}
                  id='address'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <RadioGroup
                  row
                  aria-label='controlled'
                  name='controlled'
                  value={statusChecked}
                  onChange={e => {
                    setStatusChecked(e.target.value)
                    setValues({ ...values, status: e.target.value })
                  }}
                >
                  <FormControlLabel value={0} control={<Radio />} label='Created' />
                  <FormControlLabel value={1} control={<Radio />} label='Approved' />
                  <FormControlLabel value={2} control={<Radio />} label='In Progress' />
                  <FormControlLabel value={3} control={<Radio />} label='Completed' />
                  <FormControlLabel value={4} control={<Radio />} label='Declined' />
                </RadioGroup>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  id='bookingDate'
                  onChange={onChangeInfo}
                  label='Booked on'
                  defaultValue={transaction.bookingDate}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  id='bookingTime'
                  onChange={onChangeInfo}
                  label='Booked at'
                  defaultValue={transaction.bookingTime}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  type='number'
                  label='Final Price $$'
                  onChange={onChangeInfo}
                  defaultValue={transaction.finalPrice}
                  id='finalPrice'
                ></TextField>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label='Make this default shipping address'
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: 'text.secondary'
                    }
                  }}
                />
              </Grid> */}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
            <LoadingButton variant='contained' sx={{ mr: 2 }} onClick={() => saveChanges()}>
              Save changes
            </LoadingButton>
            <LoadingButton variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default TransactionList
