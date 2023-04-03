// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import SendOutline from 'mdi-material-ui/SendOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const PreviewActions = ({ id, isPaid, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }) => {
  const dispatch = useDispatch()
  const [buttonLoad, setLoad] = useState(false)

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
              onClick={''}
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
