import React, { useState, useEffect, forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Grid, Button, InputLabel, MenuItem, TextField, Select, Divider, Typography, Collapse } from '@mui/material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'
import ToggleButton from '@mui/material/ToggleButton'

// ** Icons Imports
import { SquareEditOutline } from 'mdi-material-ui'

// ** Redux Imprts
import { useSelector } from 'react-redux'
import { updateApplicant } from 'src/redux/User/action'
import { useDispatch } from 'react-redux'

const EditInfo = ({ data, openEditInfo, setOpenEditInfo }) => {
  // ** States
  const [collapse, setCollapse] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sureBtn, setSureBtn] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const [updates, setUpdates] = useState({})

  // ** Hooks
  const dispatch = useDispatch()
  const ApplicantReducer = useSelector(state => state.ApplicantReducer)

  // Functions
  const handleStatus = e => {
    setUpdates({ ...updates, [e.target.name]: e.target.value })
  }

  const onChange = e => {
    setUpdates({ ...updates, [e.target.id]: e.target.value })
  }

  // ** Router
  const router = useRouter()
  const { id } = router.query

  const saveUpdates = async updates => {
    setLoadingBtn(true)

    const myPromise = dispatch(updateApplicant(id, updates))
      .then(res => {
        setLoadingBtn(false)
        setOpenEditInfo(false)
      })
      .catch(error => {
        setLoadingBtn(false)
        setOpenEditInfo(false)
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
      Profession: data?.DocInfo?.Profession,
      MotherFullName: data?.DocInfo?.MotherFullName,
      arName: data?.DocInfo?.arName,
      arSurname: data?.DocInfo?.arSurname,
      FullSurname: data?.DocInfo?.FullSurname,
      BirthDate: data?.DocInfo?.BirthDate,
      Adress: data?.DocInfo?.Adress,
      CreationDate: data?.DocInfo?.CreationDate,
      arBirthLocation: data?.DocInfo?.arBirthLocation,
      Status: data?.Status,
      CinNumber: data?.DocInfo?.CinNumber
    })
  }, [data])

  return (
    <Dialog
      open={openEditInfo}
      onClose={() => setOpenEditInfo(false)}
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
                    defaultValue={data?.DocInfo?.FullSurname ? data?.DocInfo?.FullSurname : 'None'}
                    label='Arabic Full Last Name'
                    id='FullSurname'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    type='text'
                    size='small'
                    defaultValue={data?.DocInfo?.MotherFullName ? data?.DocInfo?.MotherFullName : 'None'}
                    label='Mother Full Name'
                    id='MotherFullName'
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
                    id='Adress'
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
                    id='BirthDate'
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
                    defaultValue={data?.DocInfo?.Profession ? data?.DocInfo?.Profession : 'None'}
                    label='Profession'
                    id='Profession'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={onChange}
                    size='small'
                    defaultValue={data?.DocInfo?.CreationDate ? data?.DocInfo?.CreationDate : 'None'}
                    label='Creation Date'
                    id='CreationDate'
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <LoadingButton loading={loadingBtn} onClick={() => setSureBtn(!sureBtn)} sx={{ mr: 1 }} variant='contained'>
              Update
            </LoadingButton>

            <Button variant='outlined' color='secondary' onClick={() => setOpenEditInfo(false)}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default EditInfo
