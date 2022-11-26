// ** Type Import
import { IconProps } from '@iconify/react';

// ** Custom Icon Import
import Icon from 'src/@core/components/icon';

function UserIcon({ icon, ...rest }: IconProps) {
  return <Icon icon={icon} {...rest} />;
}

export default UserIcon;
