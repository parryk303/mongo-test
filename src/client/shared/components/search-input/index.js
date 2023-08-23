import { useCallback } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from "@client/utils";
import { noop } from "@client/shared/constants";

const SearchInput = ({
  type = 'text',
  placeholder = 'Search Keyword',
  size = 'small',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  borderRadius = 8,
  loaderSize = 16,
  delay = 300,
  onChange = noop
}) => {
  const handleChange = useCallback(
    debounce(evt => onChange(evt?.target?.value), delay),
    [onChange]
  );

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl
        variant="outlined"
        fullWidth={fullWidth}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius
          }
        }}
      >
        <OutlinedInput
          type={type}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {isLoading ? <CircularProgress color='inherit' size={loaderSize} /> : <Box sx={{ width: loaderSize}} />}
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  )
};

export default SearchInput;