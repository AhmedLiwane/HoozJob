// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Icons Imports
import FilterVariantRemove from 'mdi-material-ui/FilterVariantRemove'
import Refresh from 'mdi-material-ui/Refresh'
import { getAllUsers } from 'src/redux/User/action'
import { useDispatch } from 'react-redux'
import { Tooltip } from '@mui/material'

const TableHeader = props => {
  // ** Props
  const { handleSearch, handleStatus } = props

  // ** States
  const [searchWord, setSearchWord] = useState('')
  const [status, setStatus] = useState('All')

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    handleSearch(searchWord)
    handleStatus(status)

    // eslint-disable-next-line
  }, [searchWord, status])

  const handleReset = () => {
    setSearchWord('')
    setStatus('All')
  }

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          placeholder='Search by ID , Email ...'
          sx={{ mr: 4, mb: 2 }}
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <FormControl size='small' sx={{ ml: 4, mb: 2 }}>
          <InputLabel id='plan-select'>User Type</InputLabel>
          <Select
            size='small'
            id='user-type'
            label='User Type'
            labelId='user-type'
            value={status}
            onChange={e => setStatus(e.target.value)}
            inputProps={{ placeholder: 'User Type' }}
          >
            <MenuItem value='All'>All</MenuItem>
            <MenuItem value='Pro'>Pro</MenuItem>
            <MenuItem value='Normal'>Normal</MenuItem>
            <MenuItem value='Pending'>Pending</MenuItem>
            <MenuItem value='Declined'>Declined</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
