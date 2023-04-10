// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import AddCategoryLayout from 'src/views/forms/form-layouts/AddCategoryLayout'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import axios from 'axios'

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const AddCategory = () => {
  const [imgSrc, setImgSrc] = useState('/images/banners/banner-21.jpg')

  const uploadImage = async img => {
    var base64result = img.split(',')[1]
    let body = new FormData()
    body.set('key', '2be4b28341572978b5f9345a3adc90ba')
    body.append('image', base64result)

    await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    }).then(res => {
      setImgSrc(res.data.data.url)
    })
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = async () => {
        setImgSrc(reader.result)
        uploadImage(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Category Image' sx={{ objectFit: 'cover' }} />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
              </Box>
            </Box>
            <AddCategoryLayout imgSrc={imgSrc} />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default AddCategory
