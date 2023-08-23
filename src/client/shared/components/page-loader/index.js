import style from './style';
import Box from '@mui/material/Box';

export default ({ className = {}, fullPage = false }) => {
  return (
    <Box sx={className}>
      {fullPage && (
        <>
          <Box sx={{ ...style.loading, ...style.pageHeading}}>
            <span className='v-hidden'>Loading</span>
          </Box>
          <Box sx={{ mb: 5, ...style.loading, ...style.subHeading  }}>
            <Box sx={{ ...style.vHidden}}>Loading</Box>
          </Box>
        </>
      )}
      <Box sx={{ ...style.loading, ...style.heading}}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.inputField }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.heading}}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.subHeading }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.inputField }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.heading}}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.subHeading }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.inputField }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.heading}}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
      <Box sx={{ ...style.loading, ...style.inputField }}>
        <Box sx={{ ...style.vHidden}}>Loading</Box>
      </Box>
    </Box>
  );
};
