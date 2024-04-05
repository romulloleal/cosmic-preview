import { twMerge } from 'tailwind-merge';

import defaultTrackImg from '@/assets/default_track.jpg';

interface Props {
	thumbnail?: string;
	size?: string | number;
	className?: string;
}

export const TrackImage = ({ thumbnail, size, className }: Props) => {
	return (
		<img
			src={thumbnail}
			width={size}
			className={`${twMerge('', className)}`}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null;
				currentTarget.src = defaultTrackImg;
			}}
		/>
	);
};
