// ** MUI Imports
import { Theme } from '@mui/material/styles';

const Backdrop = (theme: Theme) => ({
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor:
            theme.palette.mode === 'light' ? `rgba(${theme.palette.customColors.main}, 0.5)` : 'rgba(14, 15, 36, 0.68)',
      },
      invisible: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export default Backdrop;
