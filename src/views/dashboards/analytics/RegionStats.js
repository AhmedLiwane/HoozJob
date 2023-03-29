import { Card, CardContent, CardHeader, InputAdornment, TextField, Typography } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import CustomChip from 'src/@core/components/mui/chip'
import IconButton from '@mui/material/IconButton'

// ** Import icons
import Magnify from 'mdi-material-ui/Magnify'

const RegionStats = ({ title, subheader, regions }) => {
  useEffect(() => {}, [])

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        {/* <TextField
          id='outlined-basic'
          label='Search region'
          variant='outlined'
          size='small'
          // onChange={e => setSearchWord(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Magnify />
              </InputAdornment>
            )
          }}
        /> */}

        <Demo>
          <List>
            <>
              {regions?.length > 0 ? (
                regions?.map(reg => {
                  return (
                    <ListItem
                      secondaryAction={
                        <CustomChip
                          skin='light'
                          size='smtotal'
                          color='primary'
                          label={Object.values(reg)}
                          sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                        />
                      }
                    >
                      <ListItemText primary={Object.keys(reg)} />
                    </ListItem>
                  )
                })
              ) : (
                <Typography variant='body2'>No regions yet.</Typography>
              )}
            </>
          </List>
        </Demo>
      </CardContent>
    </Card>
  )
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

export default RegionStats
