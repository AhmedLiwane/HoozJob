// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { FormControlLabel, Switch } from '@mui/material'
import { updateProvider } from 'src/redux/User/action'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = ({ data }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    companyName: data?.companyName,
    MF: data?.MF,
    bio: data?.bio,
    activityRadius: data?.activityRadius,
    available: data?.available
  })

  const handleChange = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const isAvailable = async () => {
    setValues({ ...values, available: !values.available })
  }

  const saveChanges = async () => {
    setLoading(true)

    const result = dispatch(updateProvider(id, values)).then(res => {
      setLoading(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Updated user successfully !',
      error: 'Something went wrong !'
    })
  }

  return (
    <Card>
      <CardHeader title='Provider details' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ m: 0 }} />
      <form>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Work details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Categories</InputLabel>
                <Select
                  label='Categories'
                  MenuProps={MenuProps}
                  id='demo-multiple-name'
                  labelId='demo-multiple-name-label'
                >
                  {data.Category.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Sub Categories</InputLabel>
                <Select
                  label='Sub Categories'
                  MenuProps={MenuProps}
                  id='demo-multiple-name'
                  labelId='demo-multiple-name-label'
                >
                  {data.subCategory.map(cat => (
                    <MenuItem key={cat.subCatName} value={cat.subCatName}>
                      {cat.subCatName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                label='Company Name'
                id='companyName'
                defaultValue={data.companyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' label='MF' id='MF' defaultValue={data.MF} onChange={handleChange} />
            </Grid>{' '}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                label='Activity Raduis'
                id='activityRadius'
                defaultValue={data.activityRadius}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                label='Available'
                control={<Switch checked={values.available} onClick={() => isAvailable()} />}
              />
            </Grid>
            <TextField
              sx={{ marginTop: 5 }}
              xs={6}
              sm={6}
              rows={4}
              multiline
              fullWidth
              label='Bio'
              onChange={handleChange}
              defaultValue={data.bio}
              id='bio'
            />
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: 0 }} />
        <CardActions>
          <LoadingButton
            loading={loading}
            size='large'
            onClick={() => saveChanges()}
            sx={{ mr: 2 }}
            variant='contained'
          >
            Save Changes
          </LoadingButton>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
