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
import { Close, FormatLetterCase } from 'mdi-material-ui'
import { useEffect } from 'react'
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Typography
} from '@mui/material'
import Select from '@mui/material/Select'
import { forwardRef } from 'react'
import Box from '@mui/material/Box'
import { getCategory, updateCategory } from 'src/redux/Categories/actions'
import { useRouter } from 'next/router'
import axios from 'axios'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
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

const CategoryPage = ({ imgSrc }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  // ** States
  const [loading, setLoading] = useState(false)
  const [loadingbtn, setLoadingbtn] = useState(false)
  const [category, setCategory] = useState({})

  const [values, setValues] = useState({
    categoryName: '',
    description: '',
    image: imgSrc,
    subCategories: []
  })

  const [subCat, setSubCat] = useState({
    subCatName: '',
    description: '',
    image: ''
  })
  const [subCats, setSubCats] = useState([])
  const [show, setShow] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    await axios.get('http://localhost:5000/api/backoffice/getCategory/' + id, { withCredentials: true }).then(res => {
      if (res.data.code === 200) {
        setValues({
          categoryName: res?.data?.data?.categoryName,
          description: res?.data?.data?.description,
          image: res?.data?.data?.image,
          subCategories: res?.data?.data?.subCategories
        })
        setCategory(res?.data?.data)
        setSubCats(res?.data?.data?.subCategories)
        setLoading(false)
      }
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const saveChanges = async () => {
    setLoadingbtn(true)

    const result = dispatch(updateCategory(id, values)).then(res => {
      if (res.data.code === 200) {
        dispatch(getCategory(id)).then(res => {
          if (res.data.code === 200) {
            setCategory(res.data.data)
          }
        })
      }
      setLoadingbtn(false)
    })
    await toast.promise(result, {
      loading: 'Loading...',
      success: 'Edited category successfully !',
      error: 'Something went wrong !'
    })
  }

  const handleChange = event => {
    setPersonName(event.target.value)
  }

  const onChangeInfo = async e => {
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    setValues({ ...values, image: imgSrc })
  }, [imgSrc])

  useEffect(() => {
    setValues({ ...values, subCategories: subCats })
  }, [subCats])

  return (
    <Card>
      <CardHeader title='Category details' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form>
          <Grid container spacing={5}>
            <Grid item fullWidth xs={12} sm={6}>
              <TextField
                fullWidth
                id='categoryName'
                label='Category'
                onChange={onChangeInfo}
                defaultValue={category?.categoryName}
                placeholder={'Category name'}
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
                defaultValue={category?.description}
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
            {subCats[0] ? (
              <Grid item fullWidth xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='demo-multiple-name-label'>Sub Category</InputLabel>
                  <Select
                    multiple
                    label='Sub Category'
                    value={subCats}
                    MenuProps={MenuProps}
                    id='demo-multiple-name'
                    onChange={handleChange}
                    labelId='demo-multiple-name-label'
                  >
                    {subCats.map(cat => (
                      <MenuItem key={cat.subCatName} value={cat.subCatName}>
                        {cat.subCatName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Button sx={{ marginRight: 3 }} variant='outlined' color='warning' onClick={() => setShow(true)}>
                Add Sub Category
              </Button>
              <Button
                sx={{ marginRight: 3 }}
                variant='outlined'
                color='secondary'
                onClick={() => {
                  setValues({ ...values, subCategories: [] })
                  setSubCats([])
                }}
              >
                Clear sub categories
              </Button>
              <LoadingButton
                loading={loadingbtn}
                onClick={() => saveChanges()}
                color='success'
                variant='contained'
                sx={{ mr: 4 }}
              >
                Update Category
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Add a sub category
            </Typography>
            <Typography variant='body2'>You can add as many sub categories as preferred.</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                placeholder='Example'
                label='Sub Category Name'
                id='subCatName'
                onChange={e => {
                  setSubCat({ ...subCat, [e.target.id]: e.target.value })
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                placeholder='This is an example'
                label='Description'
                id='subCatDescription'
                onChange={e => {
                  setSubCat({ ...subCat, description: e.target.value })
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <LoadingButton
            variant='contained'
            sx={{ mr: 2 }}
            onClick={() => {
              setSubCats(current => [...current, subCat])
              setShow(false)
            }}
          >
            Add Sub Category
          </LoadingButton>
          <LoadingButton variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Discard
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Backdrop
        open={loading}
        sx={{
          position: 'absolute',
          color: theme => theme.palette.common.white,
          zIndex: theme => theme.zIndex.mobileStepper - 1
        }}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Card>
  )
}

export default CategoryPage
