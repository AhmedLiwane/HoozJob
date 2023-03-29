// ** React Imports
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { reConfirmEmail } from 'src/redux/Auth/action'

const ConfirmEmail = () => {
  //** Routing and getting id Aka Token
  const router = useRouter()
  const { token } = router.query

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) dispatch(reConfirmEmail(token))
    //eslint-disable-next-line
  }, [token])

  return <></>
}

export default ConfirmEmail
