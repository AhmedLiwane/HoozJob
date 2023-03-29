// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Stack,
  DialogActions,
  Button,
  DialogContentText,
  TextField,
  Grid
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { LoadingButton } from '@mui/lab'

// ** Icons Imports
import { PencilPlusOutline, DeleteEmpty, Pencil } from 'mdi-material-ui'

// ** Redux
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createNote, deleteNote, getNotes, updateNote } from 'src/redux/User/action'

// ** Others
import toast from 'react-hot-toast'
import moment from 'moment'

const ApplicantNotes = () => {
  // ** States
  const [dialogCreate, setDialogCreate] = useState(false)
  const [dialogEdit, setDialogEdit] = useState(false)
  const [dialogDelete, setDialogDelete] = useState(false)
  const [noteID, setNoteID] = useState('')
  const [severity, setSeverity] = useState('')
  const [severityUpdate, setSeverityUpdate] = useState('')
  const [create, setCreate] = useState({})
  const [update, setUpdate] = useState({})
  const [desc, setDesc] = useState({})
  const [loadingBtn, setLoadingBtn] = useState(false)

  // ** Redux
  const dispatch = useDispatch()
  const Notes = useSelector(state => state.ApplicantReducer.notes)
  const ApplicantReducer = useSelector(state => state.ApplicantReducer)

  // ** Router Params
  const router = useRouter()
  const { id } = router.query

  // ** Close Dialog Functions
  const handleCloseDialogCreate = e => {
    setDialogCreate(false)
    setCreate({})
    setSeverity('')
  }

  const handleCloseDialogEdit = e => {
    setDialogEdit(false)
    setNoteID('')
    setSeverityUpdate('')
    setUpdate({})
    setDesc({})
  }

  const handleCloseDialogDelete = e => {
    setDialogDelete(false)
    setNoteID('')
  }

  // ** HandleChange Functions
  const handleChangeToggle = e => {
    setSeverity(e.currentTarget.value)
  }

  const handleChangeCreate = e => {
    setCreate({ ...create, [e.target.id]: e.target.value })
  }

  const handleChangeUpdate = e => {
    setUpdate({ ...update, [e.target.id]: e.target.value, noteID: noteID })
  }

  const handleChangeToggleUpdate = e => {
    setSeverityUpdate(e.currentTarget.value)
  }

  // ** Note Functions
  // Create Note
  const createNoteFunc = async () => {
    setLoadingBtn(true)

    const myPromise = dispatch(createNote(id, create))
      .then(res => {
        setLoadingBtn(false)
        handleCloseDialogCreate()
      })
      .catch(error => {
        setLoadingBtn(false)
        handleCloseDialogCreate()
      })
    await toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Applicant Created Succefully',
      error: `${ApplicantReducer.msg}`,
      position: 'bottom-right'
    })
  }

  // Upload Note
  const updateNoteFunc = async update => {
    setLoadingBtn(true)

    const myPromise = dispatch(updateNote(id, update))
      .then(res => {
        setLoadingBtn(false)
        handleCloseDialogEdit()
      })
      .catch(error => {
        setLoadingBtn(false)
        handleCloseDialogEdit()
      })
    await toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Note Updated Succefully',
      error: `${ApplicantReducer.msg}`,
      position: 'bottom-right'
    })
  }

  // Delete Note
  const deleteNoteFunc = async e => {
    setLoadingBtn(true)

    const myPromise = dispatch(deleteNote(id, { noteID: noteID }))
      .then(res => {
        setLoadingBtn(false)
        handleCloseDialogDelete()
      })
      .catch(error => {
        setLoadingBtn(false)
        handleCloseDialogDelete()
      })
    await toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Note Deleted Succefully',
      error: `${ApplicantReducer.msg}`,
      position: 'bottom-right'
    })
  }
  useEffect(() => {}, [noteID, create, severity, severityUpdate, desc])

  return (
    <Card>
      <CardHeader
        title='Notes on the Applcaint'
        action={
          <IconButton
            onClick={e => {
              setDialogCreate(true)
            }}
          >
            <PencilPlusOutline />
          </IconButton>
        }
      />
      {Notes?.length > 0 ? (
        <>
          <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
            {ApplicantReducer.load ? (
              <CircularProgress color='inherit' size={30} sx={{ mx: 2 }} />
            ) : (
              <Grid container spacing={4}>
                {Notes?.map((note, i) => {
                  return (
                    <Grid item key={note.id}>
                      <Card
                        sx={{
                          pt: 0,
                          pb: 4,
                          px: 4,
                          backgroundColor:
                            note.severity === 'info'
                              ? '#E7F4DE'
                              : note.severity === 'warning'
                              ? '#FFF6E5'
                              : note.severity === 'error'
                              ? '#FFE9E9'
                              : 'white'
                        }}
                      >
                        <CardHeader
                          title={
                            <Typography variant='body1'>
                              {i + 1} - {note.description}
                            </Typography>
                          }
                          action={
                            <>
                              <IconButton
                                id={note.id}
                                onClick={e => {
                                  setDialogEdit(true)
                                  setNoteID(e.currentTarget.id)
                                }}
                              >
                                <Pencil id={note.id} />
                              </IconButton>
                              <IconButton
                                id={note.id}
                                onClick={e => {
                                  setDialogDelete(true)
                                  setNoteID(e.currentTarget.id)
                                }}
                              >
                                <DeleteEmpty id={note.id} />
                              </IconButton>
                            </>
                          }
                        />
                        <Typography variant='body2'>
                          {moment(note.modifiedAt).format('dddd, MMMM Do YYYY')} - {note.modifiedBy}
                        </Typography>
                        {/* {note.} */}
                      </Card>
                      {noteID === note.id ? (
                        <Dialog
                          open={dialogEdit}
                          onClose={handleCloseDialogEdit}
                          aria-labelledby='alert-dialog-title'
                          aria-describedby='alert-dialog-description'
                          maxWidth={'md'}
                          fullWidth
                        >
                          {/* {} */}
                          <DialogTitle id='alert-dialog-title'>{'Write Notes'}</DialogTitle>
                          <DialogContent sx={{ mt: 6 }} className='match-height'>
                            <TextField
                              fullWidth
                              multiline
                              minRows={2}
                              size='small'
                              label='Description'
                              id='description'
                              name='description'
                              onChange={e => {
                                handleChangeUpdate(e)
                              }}
                              defaultValue={note.description}
                              sx={{
                                mt: 2,
                                backgroundColor:
                                  severityUpdate === ''
                                    ? note.severity === 'info'
                                      ? '#E7F4DE'
                                      : note.severity === 'warning'
                                      ? '#FFF6E5'
                                      : note.severity === 'error'
                                      ? '#FFE9E9'
                                      : 'white'
                                    : severityUpdate === 'info'
                                    ? '#E7F4DE'
                                    : severityUpdate === 'warning'
                                    ? '#FFF6E5'
                                    : severityUpdate === 'error'
                                    ? '#FFE9E9'
                                    : 'white'
                              }}
                            />
                            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', mt: 4 }}>
                              Priority color :
                              <ToggleButtonGroup
                                id='severity'
                                name='severity'
                                exclusive
                                value={severityUpdate}
                                onChange={e => {
                                  handleChangeToggleUpdate(e)
                                  handleChangeUpdate(e)
                                }}
                              >
                                <CustomToggleButton
                                  id='severity'
                                  value='info'
                                  setBackgroundColor='#90bf6f'
                                  sx={{ border: 0, backgroundColor: '#E7F4DE' }}
                                ></CustomToggleButton>
                                <CustomToggleButton
                                  id='severity'
                                  value='warning'
                                  setBackgroundColor='#e8be6f'
                                  sx={{ border: 0, backgroundColor: '#FFF6E5' }}
                                ></CustomToggleButton>
                                <CustomToggleButton
                                  id='severity'
                                  value='error'
                                  setBackgroundColor='#f5abab'
                                  sx={{ border: 0, backgroundColor: '#FFE9E9' }}
                                ></CustomToggleButton>
                              </ToggleButtonGroup>
                            </Box>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseDialogEdit} variant='outlined' color='error'>
                              Cancel
                            </Button>
                            <LoadingButton sx={{ mr: 1 }} variant='outlined' onClick={() => updateNoteFunc(update)}>
                              Save
                            </LoadingButton>
                          </DialogActions>
                        </Dialog>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </CardContent>
        </>
      ) : (
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>No notes on this applicant.</CardContent>
      )}
      {/* CREATE DIALOG */}
      <Dialog
        open={dialogCreate}
        onClose={handleCloseDialogCreate}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth={'xs'}
        fullWidth
      >
        <DialogTitle id='alert-dialog-title'>{'Write Notes'}</DialogTitle>
        <DialogContent sx={{ mt: 6 }} className='match-height'>
          <TextField
            fullWidth
            multiline
            minRows={2}
            size='small'
            label='Description'
            id='description'
            name='description'
            onChange={handleChangeCreate}
            sx={{
              mt: 2,
              backgroundColor:
                severity === 'info'
                  ? '#E7F4DE'
                  : severity === 'warning'
                  ? '#FFF6E5'
                  : severity === 'error'
                  ? '#FFE9E9'
                  : ''
            }}
          />
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', mt: 4 }}>
            Priority color :
            <ToggleButtonGroup
              id='severity'
              name='severity'
              exclusive
              value={severity}
              onChange={e => {
                handleChangeToggle(e)
                handleChangeCreate(e)
              }}
            >
              <CustomToggleButton
                id='severity'
                value='info'
                setBackgroundColor='#90bf6f'
                sx={{ border: 0, backgroundColor: '#E7F4DE' }}
              ></CustomToggleButton>
              <CustomToggleButton
                id='severity'
                value='warning'
                setBackgroundColor='#e8be6f'
                sx={{ border: 0, backgroundColor: '#FFF6E5' }}
              ></CustomToggleButton>
              <CustomToggleButton
                id='severity'
                value='error'
                setBackgroundColor='#f5abab'
                sx={{ border: 0, backgroundColor: '#FFE9E9' }}
              ></CustomToggleButton>
            </ToggleButtonGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogCreate} variant='outlined' color='error'>
            Cancel
          </Button>
          <LoadingButton sx={{ mr: 1 }} variant='outlined' onClick={() => createNoteFunc(create)}>
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* DELETE NOTE DIALOG */}
      <Dialog
        open={dialogDelete}
        onClose={() => handleCloseDialogDelete()}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth={'sm'}
        fullWidth
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Note'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'row', gap: 4, mt: 6 }} className='match-height'>
          <DialogContentText>Are you sure you want to delete note number # ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialogDelete()}>Cancel</Button>
          <LoadingButton
            loading={loadingBtn}
            onClick={() => deleteNoteFunc(id, { noteID: noteID })}
            sx={{ mr: 1 }}
            variant='outlined'
            color='error'
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

const CustomToggleButton = styled(ToggleButton)(({ setColor, setBackgroundColor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: setColor,
    backgroundColor: setBackgroundColor
  }
}))

export default ApplicantNotes
