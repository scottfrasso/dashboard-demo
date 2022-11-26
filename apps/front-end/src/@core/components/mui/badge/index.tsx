// ** MUI Imports
import MuiBadge from '@mui/material/Badge';

// ** Types
import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor';
import { CustomBadgeProps } from './types';

// ** Hooks Imports

function Badge(props: CustomBadgeProps) {
  // ** Props
  const { sx, skin, color } = props;

  // ** Hook
  const bgColors: UseBgColorType = useBgColor();

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight },
  };

  return (
    <MuiBadge
      {...props}
      sx={skin === 'light' && color ? ({ '& .MuiBadge-badge': colors[color], ...sx }) : sx}
    />
  );
}

export default Badge;
