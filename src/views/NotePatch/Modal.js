// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { Chip, IconButton, Tooltip } from '@mui/material'

// Icons Imports
import { AlertDecagramOutline } from 'mdi-material-ui'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Redux Imports
import { useSelector } from 'react-redux'

export default function PatchNote() {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const CompanyState = useSelector(state => state.CompanyReducer)

  return (
    <div>
      {/* <Tooltip title='Patch Notes'>
        <IconButton color='inherit' aria-haspopup='true' onClick={handleClickOpen}>
          <AlertDecagramOutline />
        </IconButton>
      </Tooltip> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='lg'
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }} id='alert-dialog-title'>
          {"What's New ?"}
        </DialogTitle>
        <DialogContent sx={{ pl: '5%' }}>
          <Box>
            <Stepper orientation='vertical'>
              {CompanyState?.patch?.map((note, index) => {
                return (
                  <Step active={true} key={index}>
                    <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: 2, marginTop: 4 }}>
                      <Typography> {note.date}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {/* ITEMS */}
                        {note.note?.map((n, i) => (
                          <News key={i} label={n.type} description={n.description} />
                        ))}
                      </Grid>
                    </StepContent>
                  </Step>
                )
              })}

              <Step active={false}>
                <StepLabel StepIconComponent={QontoStepIcon} sx={{ marginLeft: 2 }}></StepLabel>
              </Step>
            </Stepper>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function QontoStepIcon(props) {
  const { active } = props
  const CompanyState = useSelector(state => state.CompanyReducer)

  return (
    <QontoStepIconRoot ownerState={{ active }}>
      {CompanyState?.patch?.map((n, i) => {
        return (
          <div key={i} style={{ marginLeft: '-20px' }}>
            <CustomChip
              skin='light'
              size='small'
              label={`v${n.version}`}
              color={'secondary'}
              sx={{ fontWeight: 500, fontSize: '0.75rem' }}
            />
          </div>
        )
      })}
      {/* <AlertDecagramOutline sx={{ color: active ? '#1A6CD4' : 'grey' }} className='QontoStepIcon-completedIcon' /> */}
    </QontoStepIconRoot>
  )
}

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {}),
  '& .QontoStepIcon-completedIcon': {
    zIndex: 1,
    fontSize: 18
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}))

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,

  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
}

const News = ({ label, description }) => {
  return (
    <>
      <Grid item xs={2}>
        <Chip
          size='small'
          label={label.toUpperCase()}
          color={
            description === ''
              ? 'error'
              : label.toLowerCase() === 'improvement'
              ? 'primary'
              : label.toLowerCase() === 'new'
              ? 'success'
              : label.toLowerCase() === 'bug fix'
              ? 'secondary'
              : 'error'
          }
          sx={{
            width: '100%',
            fontWeight: 500,
            fontSize: '0.75rem',
            justifyContent: 'center'
          }}
        />
      </Grid>
      <Grid item xs={10}>
        {label === '' || description === '' ? 'Missing information !' : description}
      </Grid>
    </>
  )
}
