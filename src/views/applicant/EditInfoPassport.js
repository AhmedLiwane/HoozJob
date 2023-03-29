import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Grid, Button, InputLabel, MenuItem, TextField, Select, Divider, Collapse, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import ToggleButton from '@mui/material/ToggleButton'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { updateApplicant } from 'src/redux/User/action'

import toast from 'react-hot-toast'

// ** Icons Imports
import { SquareEditOutline } from 'mdi-material-ui'
import { useSelector } from 'react-redux'

const EditInfoPass = ({ data, openEditInfoPass, setOpenEditInfoPass }) => {
  const ApplicantReducer = useSelector(state => state.ApplicantReducer)

  // ** States
  const [collapse, setCollapse] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [sureBtn, setSureBtn] = useState(false)

  const [updates, setUpdates] = useState({})

  // ** Params
  const router = useRouter()
  const { id } = router.query

  // ** Hooks
  const dispatch = useDispatch()

  // ** Functions
  const handleStatus = e => {
    setUpdates({ ...updates, [e.target.name]: e.target.value })
  }

  const onChange = e => {
    setUpdates({ ...updates, [e.target.id]: e.target.value })
  }

  const saveUpdates = async updates => {
    setLoadingBtn(true)

    const myPromise = dispatch(updateApplicant(id, updates))
      .then(res => {
        setLoadingBtn(false)
        setOpenEditInfoPass(false)
      })
      .catch(error => {
        setLoadingBtn(false)
        setOpenEditInfoPass(false)
      })
    await toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Applicant Updated Succefully',
      error: `${ApplicantReducer.msg}`,
      position: 'bottom-right'
    })
  }

  useEffect(() => {
    setUpdates({
      fullSurname: data?.DocInfo?.FullSurname,
      profession: data?.DocInfo?.Profession,
      location: data?.DocInfo?.Location,
      enName: data?.DocInfo?.enName,
      enSurname: data?.DocInfo?.enSurname,
      birthDate: data?.DocInfo?.BirthDate,
      docID: data?.DocInfo?.DocumentId,
      expDate: data?.DocInfo?.ExpirationDate,
      creationDate: data?.DocInfo?.CreationDate,
      Status: data?.Status
    })
  }, [data])

  return (
    <Dialog
      open={openEditInfoPass}
      onClose={() => setOpenEditInfoPass(false)}
      aria-labelledby='user-address-edit'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
      aria-describedby='user-address-edit-description'
    >
      {sureBtn ? (
        <>
          <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Information
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Are you sure you want to update the chages for the applicant{' '}
              <Typography sx={{ fontWeight: 600, mt: 2 }}>{data?.ApplicantFullName}</Typography>
            </DialogContentText>
            <ToggleButton
              value='check'
              selected={collapse}
              onChange={() => {
                setCollapse(!collapse)
              }}
              sx={{ mb: 4, border: 0 }}
            >
              <SquareEditOutline sx={{ mr: 2 }} />
              Add description
            </ToggleButton>
            <Collapse in={collapse}>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  fullWidth
                  multiline
                  minRows={2}
                  size='small'
                  label='Description'
                  id='description'
                />
              </Grid>
            </Collapse>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <LoadingButton
              loading={loadingBtn}
              onClick={() => saveUpdates(updates, id)}
              sx={{ mr: 1 }}
              variant='contained'
            >
              Update
            </LoadingButton>
            <Button variant='outlined' color='secondary' onClick={() => setSureBtn(!sureBtn)}>
              Cancel
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Edit Information
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Edit Applicant Status
            </DialogContentText>
            <form>
              <Grid item xs={12} sm={6}>
                <FormControl size='small' fullWidth>
                  <InputLabel id='country-select'>Status</InputLabel>
                  <Select
                    onChange={handleStatus}
                    defaultValue={data?.Status}
                    label='Status'
                    labelId='user-view-plans-select-label'
                    name='Status'
                  >
                    <MenuItem value='Accepted'>Accepted</MenuItem>
                    <MenuItem value='Manuel'>Manuel</MenuItem>
                    <MenuItem value='Refused'>Refused</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/*  */}
              <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', my: 7 }}>
                Edit Applicant Personal Information
              </DialogContentText>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    type='text'
                    size='small'
                    defaultValue={data?.DocInfo?.enName ? data?.DocInfo?.enName : 'None'}
                    label='English First name'
                    id='enName'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    type='text'
                    size='small'
                    defaultValue={data?.DocInfo?.enSurname ? data?.DocInfo?.enSurname : 'None'}
                    label='English Last name'
                    id='enSurname'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0, mb: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.Country ? data?.Country : 'None'}
                    label='Country'
                    id='country'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.Profession ? data?.DocInfo?.Profession : 'None'}
                    label='Profession'
                    id='profession'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0, mb: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.BirthDate ? data?.DocInfo?.BirthDate : 'None'}
                    label='Birthday'
                    id='birthDate'
                  />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0, mb: 1 }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.CreationDate ? data?.DocInfo?.CreationDate : 'None'}
                    label='Creation Date'
                    id='creationDate'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.ExpirationDate ? data?.DocInfo?.ExpirationDate : 'None'}
                    label='Expiration Date'
                    id='expDate'
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <LoadingButton loading={loadingBtn} onClick={() => setSureBtn(!sureBtn)} sx={{ mr: 1 }} variant='contained'>
              Update
            </LoadingButton>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                setOpenEditInfoPass(false)
                setLoadingBtn(false)
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default EditInfoPass
