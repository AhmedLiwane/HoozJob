// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

import toast from 'react-hot-toast'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { viewProfile } from 'src/redux/Teammember/action'
import { useDispatch } from 'react-redux'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  checkOtp: () => Promise.resolve(),
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  confirmResetPassword: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)

  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)

      const storedToken = document.cookie
        .split(';')
        .find(cookie => cookie.startsWith('x-tela-token='))
        ?.split('=')[1]

      if (storedToken) {
        await axios
          .get('http://localhost:5000/api/backoffice/auth', {
            withCredentials: true
          })
          .then(async response => {
            dispatch(viewProfile()).then(res => {
              setLoading(false)
              setUser({ ...res.data.data })
            })
          })
          .catch(() => {
            setIsInitialized(false)
            setLoading(false)
            document.cookie = `x-tela-token=; path=/;`
            window.location.href = '/login'
            setUser(null)
          })
      } else {
        setIsInitialized(false)
        document.cookie = `x-tela-token=; path=/;`
        setUser(null)
        setLoading(false)

        router.push('/login')
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.Edmid)
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              'x-company-token': window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            const returnUrl = router.query.returnUrl
            setUser({ ...response.data.userData })
            window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
            const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            router.push(redirectURL)
          })
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    document.cookie = `x-tela-token=; path=/;`
    router.push('/login')
  }

  const handleRegister = async (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(async respense => {
        errorCallback(respense)
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleResetPassword = async (params, errorCallback) => {
    axios
      .post(authConfig.resetPasswordEndpoint, params)
      .then(async respense => {
        errorCallback(respense)
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const handleConfirmReset = async (params, errorCallback) => {
    const headers = { 'x-app-token': params.token }
    const result = axios.post(authConfig.confirmResetPasswordEndpoint, params, { headers })
    await toast.promise(result, {
      loading: 'Loading',
      success: 'Password changed successfully !',
      error: 'Something went wrong !'
    })
    setTimeout(() => router.push('/'), 2000)
  }

  const handleCheckOtp = async (params, errorCallback) => {
    const headers = { 'x-member-id': params.token }
    axios
      .post(authConfig.checkOtpEndpoint, params, { headers })
      .then(async respense => {
        errorCallback(respense)
      })
      .catch(err => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    resetPassword: handleResetPassword,
    confirmResetPassword: handleConfirmReset,
    checkOtp: handleCheckOtp
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
