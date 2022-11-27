import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Icon from '@mui/material/Icon'
import Box from '@mui/material/Box'

export const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <Box flex={2}>
      <form onSubmit={handleSearch}>
        <TextField
          placeholder="Pesquisar..."
          onChange={e => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            )
          }}
        />
      </form>
    </Box>
  )
}
