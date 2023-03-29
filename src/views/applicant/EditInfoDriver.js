import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Grid, Button, InputLabel, MenuItem, TextField, Select, Divider, Typography, Collapse } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { SquareEditOutline } from 'mdi-material-ui'
import ToggleButton from '@mui/material/ToggleButton'

import toast from 'react-hot-toast'

// ** Redux Imports
import { useDispatch } from 'react-redux'
import { updateApplicant } from 'src/redux/User/action'
import { useSelector } from 'react-redux'

const EditInfoDriver = ({ data, openEditInfoDriver, setOpenEditInfoDriver }) => {
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [sureBtn, setSureBtn] = useState(false)
  const [updates, setUpdates] = useState({})
  const [collapse, setCollapse] = useState(false)

  // ** Params
  const router = useRouter()
  const { id } = router.query

  // ** Hooks
  const dispatch = useDispatch()
  const ApplicantReducer = useSelector(state => state.ApplicantReducer)

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
        setOpenEditInfoDriver(false)
      })
      .catch(error => {
        setLoadingBtn(false)
        setOpenEditInfoDriver(false)
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
      enName: data?.DocInfo?.enName,
      arName: data?.DocInfo?.arName,
      enSurname: data?.DocInfo?.enSurname,
      arSurname: data?.DocInfo?.arSurname,
      birthDate: data?.DocInfo?.BirthDate,
      creationDate: data?.DocInfo?.CreationDate,
      enBirthLocation: data?.DocInfo?.enBirthLocation,
      arBirthLocation: data?.DocInfo?.arBirthLocation,
      docID: data?.DocInfo?.DocumentId,
      adress: data?.DocInfo?.Adress,
      expDate: data?.DocInfo?.ExpirationDate,
      Status: data?.Status
    })
  }, [data])

  return (
    <Dialog
      open={openEditInfoDriver}
      onClose={() => setOpenEditInfoDriver(false)}
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
              <Typography dispaly='inline' sx={{ fontWeight: 600 }}>
                {data?.ApplicantFullName}
              </Typography>
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
            </ToggleButton>{' '}
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
            <Button variant='outlined' color='secondary' onClick={() => setSureBtn(false)}>
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
                    id='Status'
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
                    type='text'
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.arName ? data?.DocInfo?.arName : 'None'}
                    label='Arabic First Name'
                    id='arName'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    type='text'
                    size='small'
                    defaultValue={data?.DocInfo?.arSurname ? data?.DocInfo?.arSurname : 'None'}
                    label='Arabic Last Name'
                    id='arSurname'
                  />
                </Grid>
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
                <Grid item xs={12}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Address'
                    defaultValue={data?.DocInfo?.Adress ? data?.DocInfo?.Adress : 'None'}
                    id='adress'
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.arBirthLocation ? data?.DocInfo?.arBirthLocation : 'None'}
                    label='Birth Place'
                    id='arBirthLocation'
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.enBirthLocation ? data?.DocInfo?.enBirthLocation : 'None'}
                    label='English Birth Place'
                    id='enBirthLocation'
                  />
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
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <LoadingButton loading={loadingBtn} onClick={() => setSureBtn(!sureBtn)} sx={{ mr: 1 }} variant='contained'>
              Update
            </LoadingButton>
            <Button variant='outlined' color='secondary' onClick={() => setOpenEditInfoDriver(false)}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default EditInfoDriver
