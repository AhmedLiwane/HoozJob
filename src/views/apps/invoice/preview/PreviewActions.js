// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import { InitPayment } from 'src/redux/Company/action'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const PreviewActions = ({ id, isPaid, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }) => {
  const dispatch = useDispatch()
  const [buttonLoad, setLoad] = useState(false)

  const redirectToPayment = () => {
    setLoad(true)
    dispatch(InitPayment(id))
      .then(res => {
        setLoad(false)
        window.open(res.data.url, '_blank').focus()
      })
      .catch(err => {
        setLoad(false), console.log(err)
      })
  }

  return (
    <>
      {isPaid ? null : (
        <Card>
          <CardContent>
            <LoadingButton
              sx={{ mb: 3.5 }}
              fullWidth
              loading={buttonLoad}
              color='success'
              variant='contained'
              startIcon={<CurrencyUsd />}
              onClick={redirectToPayment}
            >
              Pay with card
            </LoadingButton>
            <Button fullWidth variant='contained' startIcon={<SendOutline />} onClick={toggleSendInvoiceDrawer}>
              Pay with wire
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default PreviewActions
