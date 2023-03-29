import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { checkPay } from 'src/redux/Company/action'
import { useDispatch } from 'react-redux'

const Index = () => {
  const router = useRouter()
  const refId = router.query.payment_ref
  const dispatch = useDispatch()

  const checkPayment = () => {
    dispatch(checkPay(refId))
      .then(res => {
        router.replace('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    checkPayment()
  }, [])

  return (
    <Backdrop
      open={true}
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

export default Index
