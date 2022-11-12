import { Icon, Box, InputAdornment, TextField } from '@mui/material'

interface ISearchBarProps {
  handleSearch: (value: React.FormEvent<HTMLFormElement>) => void
  setQuery: (value: string) => void
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  handleSearch,
  setQuery
}) => {
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
