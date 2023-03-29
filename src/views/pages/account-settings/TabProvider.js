// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import toast from 'react-hot-toast'

// ** Icons Imports
import { useSelector } from 'react-redux'
import { updateMember } from 'src/redux/Teammember/action'
import { useDispatch } from 'react-redux'
import { resendConfirmEmail } from 'src/redux/Auth/action'
import { Badge, Rating } from '@mui/material'
import FormLayoutsIcons from 'src/views/forms/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/forms/form-layouts/FormLayoutsSeparator'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  //** Hooks
  const UserState = useSelector(state => state.UserReducer)

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <FormLayoutsSeparator data={UserState?.user?.providerInfo} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
