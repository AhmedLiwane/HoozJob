// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addAdmin } from 'src/redux/Teammember/action'
import { FormatLetterCase } from 'mdi-material-ui'
import { useEffect } from 'react'

const AddSubCategoryLayout = ({ imgSrc }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** States
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    userFullName: '',
    email: '',
    password: '',
    image: imgSrc
  })

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    setValues({ ...values, image: imgSrc })
  }, [imgSrc])

  const saveChanges = async () => {
    setLoading(true)

    const result = dispatch(addAdmin(values)).then(res => {
      setLoading(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Added admin successfully !',
      error: 'Something went wrong !'
    })
  }

  return (
    <Card>
      <CardHeader title='Add sub category details' titleTypographyProps={{ variant: 'h6' }} />

      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='subCatName'
                label='Sub Category'
                onChange={onChangeInfo}
                placeholder={'Sub Category name'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                type='text'
                id='description'
                label='Description'
                onChange={onChangeInfo}
                placeholder={'This is an example...'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FormatLetterCase />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button sx={{ marginRight: 3 }} variant='outlined' color='warning'>
                Add Sub Category
              </Button>
              <LoadingButton
                loading={loading}
                onClick={() => saveChanges()}
                color='success'
                variant='contained'
                sx={{ mr: 4 }}
              >
                Create Category
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddSubCategoryLayout
