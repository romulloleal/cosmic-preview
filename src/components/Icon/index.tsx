import { Icon as Iconify, IconProps } from '@iconify/react';

interface Props extends IconProps {
	cursorPointer?: boolean;
}

export const Icon = ({ cursor = 'pointer', ...rest }: Props) => {
	return <Iconify cursor={cursor} {...rest} />;
};
