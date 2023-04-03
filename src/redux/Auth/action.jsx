/*eslint-disable*/

import axios from 'axios'
import toast from 'react-hot-toast'
import { FAIL_USER, LOAD_USER, CURRENT_USER, LOGIN_USER } from '../actionTypes'

// current check accessToken
export const isAuth = () => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })
    const result = await axios.get('https://api.hoozjob.com/api/backoffice/AuthAdmin', { headers })

    if (result.data.code !== 200) {
      dispatch({ type: FAIL_USER, payload: result.data })
      window.location.href = `/login`
    } else {
      dispatch({ type: CURRENT_USER, payload: result.data })
    }
  } catch (error) {
    if (error.response.data.code === 401) {
      window.location.href = '/login'
    } else {
      dispatch({ type: FAIL_USER, payload: error.response.data })
    }
  }
}

export const login = values => async dispatch => {
  try {
    dispatch({ type: LOAD_USER })
    const result = await axios.post('https://api.hoozjob.com/api/backoffice/login', values, { withCredentials: true })
    console.log(result.data)
    dispatch({ type: LOGIN_USER, payload: result.data })
    return result
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
    return error
  }
}

export const confirmEmail = email => async dispatch => {
  try {
    let result = await axios.post(
      `https://api.hoozjob.com/api/backoffice/confirmEmail`,
      {
        recipientEmail: email
      },
      { headers }
    )
    if (result.data.code !== 200) {
      toast.error('Something went wrong !')
      dispatch({ type: FAIL_USER, payload: error })
    } else {
      toast.success('Email sent !')
    }
  } catch (error) {
    if (error.response.data.code === 401) {
      window.location.href = '/login'
    } else {
      dispatch({ type: FAIL_USER, payload: error.response.data })
    }
  }
}

export const reConfirmEmail = token => async dispatch => {
  try {
    const headers = { 'x-app-token': token }
    let result = await axios.post(`https://api.hoozjob.com/api/backoffice/reConfirmEmail`, '', { headers })
    if (result.data.code !== 200) {
      toast.error('Something went wrong !')
      window.location.href = '/login'
    } else {
      toast.success('Email confirmed')
      window.location.href = '/dashboard'
    }
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const resendConfirmEmail = email => async dispatch => {
  try {
    const headers = {
      'x-company-token': localStorage.getItem('accessToken')
    }

    const result = await axios.post(
      `https://api.hoozjob.com/api/backoffice/resendConfirmEmail`,
      {
        recipientEmail: email
      },
      { headers }
    )
  } catch (error) {
    if (error.response.data.code === 401) {
      window.location.href = '/login'
    } else {
      dispatch({ type: FAIL_USER, payload: error.response.data })
    }
  }
}
