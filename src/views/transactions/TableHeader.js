// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch } from 'react-redux'

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
    if (status === '0') {
      handleStatus(0)
    } else if (status === '1') {
      handleStatus(1)
    } else if (status === '2') {
      handleStatus(2)
    } else if (status === '3') {
      handleStatus(3)
    } else if (status === '4') {
      handleStatus(4)
    } else {
      handleStatus('All')
    }

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
          placeholder='Search by ID , Category ...'
          sx={{ mr: 4, mb: 2 }}
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <FormControl size='small' sx={{ ml: 4, mb: 2 }}>
          <InputLabel id='plan-select'>Status</InputLabel>
          <Select
            size='small'
            id='status'
            label='Status'
            labelId='status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            inputProps={{ placeholder: 'Status' }}
          >
            <MenuItem value='All'>All</MenuItem>
            <MenuItem value='0'>Created</MenuItem>
            <MenuItem value='1'>Approved</MenuItem>
            <MenuItem value='3'>Completed</MenuItem>
            <MenuItem value='4'>Declined</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default TableHeader
