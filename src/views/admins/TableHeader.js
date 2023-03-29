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

// ** Icons Imports
import { useDispatch } from 'react-redux'

const TableHeader = props => {
  // ** Props
  const { handleSearch, handleStatus } = props

  // ** States
  const [searchWord, setSearchWord] = useState('')

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    handleSearch(searchWord)

    // eslint-disable-next-line
  }, [searchWord])

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
      </Box>
    </Box>
  )
}

export default TableHeader
