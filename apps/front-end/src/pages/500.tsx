// ** React Imports
import { ReactNode } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw',
  },
}));

const Img = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  marginTop: theme.spacing(4),
}));

function Error500() {
  // ** Hooks
  const theme = useTheme();

  return (
    <Box className="content-center">
      <Box sx={{
        p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      }}
      >
        <BoxWrapper>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Internal server error :(
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>Oops, something went wrong!</Typography>
          <Button href="/" component={Link} variant="contained">
            Back to Home
          </Button>
        </BoxWrapper>
        <Img width="500" alt="error-illustration" src={`/images/pages/page-misc-error-${theme.palette.mode}.png`} />
      </Box>
    </Box>
  );
}

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error500;
