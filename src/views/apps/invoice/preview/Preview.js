// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Demo Components Imports
import PreviewCard from 'src/views/apps/invoice/preview/PreviewCard'
import PreviewActions from 'src/views/apps/invoice/preview/PreviewActions'
import AddPaymentDrawer from 'src/views/apps/invoice/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/invoice/shared-drawer/SendInvoiceDrawer'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@mui/material'
import { getInvoice } from 'src/redux/Company/action'
import { useDispatch } from 'react-redux'

const InvoicePreview = () => {
  //** Routing and getting id Aka Token
  const router = useRouter()
  const { id } = router.query

  // ** Hooks
  const CompanyState = useSelector(state => state.CompanyReducer)
  const dispatch = useDispatch()

  // ** State
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  useEffect(() => {
    dispatch(getInvoice(id))
    //eslint-disable-next-line
  }, [])

  if (!CompanyState.load && !CompanyState.error) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              id={id}
              isPaid={CompanyState.invoice?.isPaid}
              toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
            />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else if (!CompanyState.load && CompanyState.error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            Invoice with the id: {id} does not exist. Please check the list of invoices:{' '}
            <Link href='/apps/invoice/list'>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
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
  }
}

export default InvoicePreview
